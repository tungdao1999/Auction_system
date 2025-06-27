const authToken = require('../common/auth-token');
const { Roles } = require('../common/const');

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ error: 'Token missing' });

  try {
    const decoded = authToken.verifyAuthToken(token);
    if (!decoded || !decoded.role || decoded.role !== Roles.SELLER) {
      return res.status(403).json({ error: 'Forbidden: Buyer access only' });
    }
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};