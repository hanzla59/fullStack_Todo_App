const Joi = require('joi');

const errorHandler = (error, req, res, next) => {
    let status = 501;
    let data = {
        message:"Internal Server Error"
    }
    if(error instanceof Joi.ValidationError){
        status = 401,
        data.message = error.message
    }
    if(error.status){
        status = error.status
    }
    if(error.message){
        data.message = error.message
    }
    res.status(status).json(data)

}

module.exports = errorHandler;