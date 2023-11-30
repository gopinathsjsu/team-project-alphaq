const crypto = require('crypto');

// Ensure sensitive data like database URLs and secrets are not hardcoded in production
process.env.DATABASE_URL = process.env.DATABASE_URL || 
    'mongodb+srv://mohana:Mohan4984.@moviebook.k8wjoan.mongodb.net/MovieBook';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3000;
process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'MovieBook';

// Generate a random 32-byte hexadecimal string as JWT_SECRET
// Note: In production, set JWT_SECRET as an environment variable
process.env.JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
