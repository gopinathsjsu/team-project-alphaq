const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const { User } = require('../database/schemas');
const router = express.Router();

// Middleware to validate JWT token
const validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
      return res.status(401).send({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Get the token part from the header
  if (!token) {
    return res.status(401).send({ message: 'Access denied. No token provided.' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (ex) {
      res.status(401).send({ message: 'Invalid token.' });
  }
};


// Register new user
router.post('/register', (req, res) => {
  console.log(req.body, "register");

  // Check if all required fields are provided
  if (!req || !req.body || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
      console.log("All fields are required");
      return res.status(400).send({ message: 'All fields are required' });
  }

  // Lowercase the email to maintain consistency
  const email = req.body.email.toLowerCase();

  // Check if a user with the same email already exists
  User.findOne({ email: email })
      .then(existingUser => {
          if (existingUser) {
              return res.status(400).send({ message: 'Email already exists' });
          }

          // Create a new user object
          const newUserDetails = {
              ...req.body,
              username: email,
              email: email,
              firstName: req.body.firstName,
              lastName: req.body.lastName
          };

          // Create a new User and save it
          const newUser = new User(newUserDetails);
          newUser.hashPassword()
              .then(() => {
                  newUser.save()
                      .then(savedUser => {
                          // Generate a token
                          const token = jwt.sign({ id: savedUser.id }, process.env.JWT_SECRET, {
                              expiresIn: '1h' // Expires in 1 hour
                          });

                          // Send user info, token, and session details
                          req.login(savedUser, err => {
                              if (err) {
                                  console.error('Error logging in new user:', err);
                                  return res.status(500).send({ message: 'Error logging in new user', error: err.message });
                              }
                              res.send({
                                  message: 'User created and logged in successfully',
                                  user: savedUser.hidePassword(),
                                  token: token,
                                  session: req.sessionID
                              });
                          });
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
  req.body.email = req.body.email.toLowerCase();

  passport.authenticate('local', (err, user, info) => {
      if (err) {
          return next(err);
      }
      if (!user) {
          return res.status(401).send(info);
      }

      req.login(user, err => {
        if (err) {
            return res.status(401).send({ message: 'Login failed', err });
        }
  
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
          // Send user info, token, and session details
          res.send({
              message: 'Logged in successfully',
              user: user.hidePassword(), // Assuming hidePassword removes sensitive info
              token: token,
              session: req.sessionID
          });
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

router.get('/getUserInfo', validateToken, (req, res) => {
  User.findById(req.user.id)
      .then(user => {
          if (!user) {
              return res.status(404).send({ message: 'User not found.' });
          }
          res.send({
              message: 'User information retrieved successfully',
              user: user.hidePassword(), // Assuming hidePassword removes sensitive info
              token: req.headers['authorization'], // Send the token back
              session: req.sessionID
          });
      })
      .catch(err => {
          console.error(err);
          res.status(500).send({ message: 'Error retrieving user', error: err.message });
      });
});

module.exports = router;
