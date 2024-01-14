const { jwtSecrect } = require('../keys');

const jwt = require('jsonwebtoken');
const jwtpass = jwtSecrect

function generateToken(user){
    return jwt.sign(user, jwtpass)
}

function validateUser(req, res, next){
    try {
        jwt.verify(req.headers.authorization, jwtpass)
        next();
    } catch (error) {
        res.status(404).json({
            msg:"Invalid user"
        })
    }
}

function decodeToken(token){
    return jwt.decode(token)
}

module.exports = {
    generateToken,
    validateUser,
     decodeToken
}