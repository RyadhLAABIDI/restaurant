const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');

 exports.authenticatateJWT = (req, res, next) => {
    const token = req.cookies.toke;
    
    
   if (!token) {
        return res.status(401).json({
            errorMessage: 'No token. Authorization denied',
        });
    }

    };
    
