const express  = require('express');
const passport = require('passport');

const { User } = require('../database/schemas');

const router = express.Router();

module.exports = router;

// router.post('/register', (req, res) => {
//   if (!req || !req.body || !req.body.username || !req.body.password) {
//     return res.status(400).send({ message: 'Username and Password required' });
//   }

//   const username = req.body.username.toLowerCase();

//   User.findOne({ username: username })
//     .then(existingUser => {
//       if (existingUser) {
//         return res.status(400).send({ message: 'Username exists' });
//       }

//       const newUser = new User({ ...req.body, username: username });
      
//       newUser.hashPassword()
//         .then(() => {
//           newUser.save()
//             .then(savedUser => {
//               res.send({ message: 'User created successfully', user: savedUser.hidePassword() });
//             })
//             .catch(saveError => {
//               console.error('Error saving user:', saveError);
//               res.status(500).send({ message: 'Error saving user', error: saveError.message });
//             });            
//         })
//         .catch(hashError => {
//           console.error(hashError);
//           res.status(500).send({ message: 'Error hashing password', error: hashError });
//         });
//     })
//     .catch(findError => {
//       console.error(findError);
//       res.status(500).send({ message: 'Error finding user', error: findError });
//     });
// });
router.post('/register', (req, res) => {
  const newUser = new User(req.body);

  newUser.save()
    .then(user => res.status(201).json(user))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

router.post('/login', (req, res, next) => {
  req.body.username = req.body.username.toLowerCase();

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
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
