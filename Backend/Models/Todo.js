const mongoose = require('mongoose') ;

const TodoSchema = new mongoose.Schema({
    task:{
        type: String,
        required: [true, 'Task is required'],  // Provide a custom error message
    },
    done:{
        type: Boolean,
        default: false,
    },
})  
 
const TodoModel =  mongoose.model('todos', TodoSchema) ;
module.exports = TodoModel ; 