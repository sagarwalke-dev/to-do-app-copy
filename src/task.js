//import module
const mongoose = require('mongoose');
const Task = require('./taskSchema');

//connection url
 const URL = 'mongodb://localhost:27017/TODO';
//const URL='mongodb+srv://mongocloud:<password>@cluster0.3wkxm.mongodb.net/<DB Name>?retryWrites=true&w=majority'
//db connection
mongoose.connect(URL);
//get connection object
const conn = mongoose.connection;
//open connection
conn.on('open', () => {
    console.log('DB Connection established...');
});

//add task to db
let addTask = async (id, name, desc, date) => {
    try {
        let task = new Task({ taskId: id, taskName: name, taskDesc: desc, taskDate: date});
        return await task.save();
    }
    catch (error) {
        console.log('Failed to add Task :: ' + error);
    }
}

//get all task
let getAllTask= async()=>{
    try{
        return await Task.find();
    }
    catch(error){
        console.log('Failed to read all task :: '+error);
    }
}

//find by ID
let getTaskById=async (id)=>{
    try{
        return await Task.find({taskId:id});
    }
    catch(error){
        console.log('Failed to read task with id :: '+error);
    }
}

//update task by id

let updateTask=async (id,status)=>{
    try{
        return await Task.updateOne({taskId:id},{taskStatus:status});
    }
    catch(error){
        console.log('Failed to update task :: '+task);
    }
}

//delete task by id
let deleteTaskById=async (id)=>{
    try{
        return await Task.deleteOne({taskId:id});
    }
    catch(error){
        console.log('Failed to delete task :: '+error);
    }
}

//pending tasks
let pendingTask=async ()=>{
    try{
        return await Task.find({taskStatus:false});
    }
    catch(error){
        console.log('Failed to read pending task :: '+error);
    }
}

//get completed task
let completedTask=async ()=>{
    try{
        return await Task.find({taskStatus:true});
    }
    catch(error){
        console.log('Failed to read completed task :: '+error);
    }
}

//export methods
module.exports={addTask,getAllTask,getTaskById,updateTask,deleteTaskById,pendingTask,completedTask};
