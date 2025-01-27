const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{type:String},
    username:{type:String},
    email:{type:String},
    password:{type:String}
},{timestamps:true})

module.exports = mongoose.model('User', userSchema);