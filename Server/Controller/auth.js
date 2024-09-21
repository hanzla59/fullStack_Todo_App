const User = require("../Models/user");
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwtAuthentication = require("../JWT/jwt");


const passwordpattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const authController = {
    async signUp(req,res,next){
        const signUpSchema = Joi.object({
            name:Joi.string().required(),
            username:Joi.string().min(5).required(),
            email:Joi.string().email().required(),
            password:Joi.string().pattern(passwordpattern).required()
        })
        const {error} = signUpSchema.validate(req.body)
        if(error){
            return next(error);
        }
        const {name, username, email, password} = req.body;
        try {
            const finduser = await User.findOne({username:username, email:email});
            if(finduser){
                return next({
                    status:409,
                    message:"username or email already exist"
                })
            }
            const hashed_Password = await bcrypt.hash(password, 10)
            const new_user = new User({
                name,
                username,
                email,
                password:hashed_Password
            })
            const user = await new_user.save();
            const token = await jwtAuthentication.asign_Token({_id:user._id},'1440m')
            res.status(201).json({message:"Your Accout Create Suucessfully", User:user, token:token, auth:true})

        } catch (error) {
            return next(error);
        }       
    },
    async login(req,res,next){
        const loginSchema = Joi.object({           
            username:Joi.string().min(5).required(), 
            password:Joi.string().pattern(passwordpattern).required()
        })
        const {error} = loginSchema.validate(req.body)

        if(error){
            return next(error);
        }
        const {username, password} = req.body;
        try {
            const user = await User.findOne({username:username});
            if(!user){
                return next({
                    status:401,
                    message:"Invalid username"
                })
            }
            const check_Password = await bcrypt.compare(password, user.password);
            if(!check_Password){
                return next({
                    status:401,
                    message:"Invalid password"
                })
            }
            const token = await jwtAuthentication.asign_Token({_id:user._id}, '1440m')
            res.status(201).json({message:"User Login Successfully", User:user, token:token, auth:true});

        } catch (error) {
            return next(error)
        }
    }

}
module.exports = authController;