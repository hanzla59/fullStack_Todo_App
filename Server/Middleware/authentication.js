const jwtAuthentication = require("../JWT/jwt");
const User = require("../Models/user");
const authentication = async(req, res, next) => {

    if(!req.headers.authorization){
        return next({   
            status:401,     
            message:"header UnAuthorized Access"
        })
    }
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return next({
            status:401,
            message:"token UnAuthorized Access"
        })
    }
    try {
        const recivedToken = jwtAuthentication.verify_Token(token);
        if(!recivedToken){
            return next({
                status:401,
                message:"Verify UnAuthorized Access"
            })
        }
        const user = await User.findById(recivedToken._id);
        if(!user){
            return next({
                status:401,
                message:"user does not exist"
            })
        }   
        req.user = user;
        next();
    } catch (error) {
        return next({
            status:401,
            message:"UnAuthorized Access"
        })
    }

}

module.exports = authentication;