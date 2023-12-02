const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  // Extract the token part (Bearer token)
  const token = authorizationHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: 'Unauthorized - Invalid token format' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, 'your_secret_key');

    // Attach the decoded token to the request object for future use
    req.userId = decodedToken.userId;
    req.theaterId = decodedToken.theaterId;

    // Continue with the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = {
  requireAuth,
};
