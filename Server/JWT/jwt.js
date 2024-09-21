const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()
const Token_Secret_Key = process.env.Token_Secret_Key;
const jwtAuthentication = {
    asign_Token(payload, expiryTime){
        return jwt.sign(payload, Token_Secret_Key, {expiresIn:expiryTime})
    },
    verify_Token(token){
        return jwt.verify(token, Token_Secret_Key)
    },
}

module.exports = jwtAuthentication
