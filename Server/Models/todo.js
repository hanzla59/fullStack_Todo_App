const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title:{type:String},
    description:{type:String},
    status:{type:String, enum:['open', 'complete', 'cancel'], default:'open'},
    user:{type:Schema.Types.ObjectId, ref:'User'},
},{timestamps:true})

module.exports = mongoose.model('Todo', todoSchema);