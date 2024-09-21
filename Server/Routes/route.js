const express = require('express');
const router = express.Router();
const authController = require("../Controller/auth");
const todoController = require("../Controller/todo");
const authentication = require("../Middleware/authentication");

router.get("/", (req,res)=>{
    res.status(201).json({message:"backend Routes Work Properly"})
})
router.post("/signUp", authController.signUp);
router.post("/login", authController.login);
router.post("/createTodo",authentication, todoController.addTodo);
router.get("/myTodos",authentication, todoController.getTodos);
router.put("/updateTodo/:id",authentication, todoController.updateTodo);
module.exports = router;