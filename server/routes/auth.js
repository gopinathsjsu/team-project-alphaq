const express = require('express');
const passport = require('passport');
const { User } = require('../database/schemas');
const router = express.Router();

// Register new user
router.post('/register', (req, res) => {
    console.log(req.body, "register");

    // Check if email and password are provided
    if (!req || !req.body || !req.body.email || !req.body.password) {
        console.log("Email and password required");
        return res.status(400).send({ message: 'Email and Password required' });
    }

    // Lowercase the email to maintain consistency
    const email = req.body.email.toLowerCase();

    // Check if a user with the same email already exists
    User.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                // User with this email already exists
                return res.status(400).send({ message: 'Email already exists' });
            }

            // Create a new user object
            const newUserDetails = { ...req.body, email: email };
            if (!req.body.username) {
              newUserDetails.username = req.body.email;
            }
            // If username is provided, use it; otherwise, don't include it in the newUserDetails
            if (req.body.username) {
                newUserDetails.username = req.body.username;
            }
            console.log(newUserDetails,"newUserDetails")
            const newUser = new User(newUserDetails);
            console.log(newUser,"newUser")
            // Hash the password and save the new user
            newUser.hashPassword()
                .then(() => {
                    newUser.save()
                        .then(savedUser => {
                            res.send({ message: 'User created successfully', user: savedUser.hidePassword() });
                        })
                        .catch(saveError => {
                            console.error('Error saving user:', saveError);
                            res.status(500).send({ message: 'Error saving user', error: saveError.message });
                        });
                })
                .catch(hashError => {
                    console.error(hashError);
                    res.status(500).send({ message: 'Error hashing password', error: hashError });
                });
        })
        .catch(findError => {
            console.error(findError);
            res.status(500).send({ message: 'Error finding user', error: findError });
        });
});


router.post('/login', (req, res, next) => {
  console.log(req.body);
  req.body.email = req.body.email.toLowerCase();

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log("error 1");
      return next(err);
    }
    console.log(user);
    if (!user) {
      console.log("error 2",err, user, info);

      return res.status(401).send(info);
    }

    req.login(user, err => {
      if (err) {
        res.status(401).send({ message: 'Login failed', err });
      }
      res.send({ message: 'Logged in successfully', user: user.hidePassword() });
    });

  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      res.status(400).send({ message: 'Logout failed', err });
    }

    req.session.destroy(err => {
      if (err) {
        res.status(400).send({ message: 'Logout failed', err });
      }

      res.clearCookie('connect.sid');
      req.sessionID = null;
      res.send({ message: 'Logged out successfully' });
    });
  });
});

module.exports = router;
