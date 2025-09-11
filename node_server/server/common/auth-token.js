const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiration } = require('../config/jwt.config');

const SECRET_KEY = jwtSecret;

class AuthToken {
    static generateAuthToken = (user) => {
        const payload = {
            id: user.id,
            role: user.role,
            email: user.email,
            phone: user.phone,
        };

        return jwt.sign(payload, SECRET_KEY, { expiresIn: jwtExpiration });
    }

    static verifyAuthToken = (token) => {
        try {
            return jwt.verify(token, SECRET_KEY);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}

module.exports = AuthToken;