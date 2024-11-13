const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// const JWT_SECRET = crypto.randomBytes(32).toString('hex');
// console.log(JWT_SECRET); // Print the secret to store in .env


const authMiddleware = (req, res, next) => {
  
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

module.exports = authMiddleware;
