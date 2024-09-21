const Joi = require('joi')
const Todo = require('../Models/todo')  

const todoController = {
    async addTodo(req,res,next){
        const addTodoSchema = Joi.object({
            title:Joi.string().required(),
            description:Joi.string().required()
        })  
        const {error} = addTodoSchema.validate(req.body)
        if(error){
            return next(error)
        }
        const {title, description} = req.body
        try {   
            const newTodo = new Todo({
                title,
                description,
                user: req.user._id
            })
            const todo = await newTodo.save()
            res.status(201).json({message:"Todo Added Successfully", todo:todo})
        } catch (error) {
            next(error)
        }
    },
    async getTodos(req,res,next){
        try {
            const todos = await Todo.find({user:req.user._id})
            if(todos.length !== 0){
                res.status(201).json({todos:todos})
            } 
            else{
                res.status(201).json({message:"No Todo Found"})
            }
        } catch (error) {
            next(error)
        }
    },
    async updateTodo(req,res,next){
        const findtodo = await Todo.findById(req.params.id).populate('user')
        if(!findtodo){
            return next({
                status:404,
                message:"Todo Not Found"
            })
        }
        if(findtodo.user._id.toString() !== req.user._id.toString()){
            return next({
                status:401,
                message:"Unauthorized Access"
            })
        }
        const updateTodoSchema = Joi.object({
            status:Joi.string().valid('complete', 'cancel').required()
        })
        const {error} = updateTodoSchema.validate(req.body)
        if(error){
            return next(error)
        }
        const {status} = req.body
        try {
            const updateTodo = await Todo.findByIdAndUpdate(req.params.id, {status}, {new:true})    
            res.status(201).json({message:`Todo ${status} Successfully`, todo:updateTodo})    
        } catch (error) {
            next(error)
        }   
    }
}

module.exports = todoController