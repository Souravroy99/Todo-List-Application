const express = require('express') ;
const router = express.Router() ;
const TodoModel = require('../Models/Todo')


// Add Task
router.route('/').post(async(req, res) => {
    try{
        const {task} = req.body ;
        const createdTodoTask = await TodoModel.create({task}) ;
        res.status(201).json(createdTodoTask) ;
    }
    catch(error) {
        res.status(400).json(`auth-router.js ADD TASK ERROR!`) ;
    }
})


// Fetch all the tasks
router.route('/tasks').get(async(req, res) => {
    try{
        const allTasks = await TodoModel.find() ;

        if(!allTasks || allTasks.length === 0) {
            return res.status(400).json("No task found!") ;
        }

        res.status(200).json(allTasks) ;
    }
    catch(error) {
        res.status(400).json(`auth-router.js ALL TASKS FETCH ERROR!`) ;
    }
})


// Update single task by ID
router.route('/update/:id').patch(async(req, res) => {
    try{
        const id = req.params.id ;
        const task = await TodoModel.findOne({_id: id}) ;

        task.done = !task.done ;

        await task.save() ;  // Interesting 

        res.status(200).json(task) ;
    }
    catch(error) {
        res.status(400).json(`auth-router.js UPDATE ERROR! : ${error}`) ;
    }
})


// Delete Single task by ID
router.route('/delete/:id').delete(async(req,res) => {
    try{
        const id = req.params.id ;
        await TodoModel.deleteOne({_id: id}) ;
        const data = await TodoModel.find() ;
        return res.status(200).json(data) ;
    }
    catch(error) {
        res.status(400).json(`auth-router.js DELETE ERROR! : ${error}`) ;
    }
})

module.exports = router ;