const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'your_secret_key', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.userId = decodedToken.userId;
    next();
  });
};

module.exports = {
  requireAuth,
};
