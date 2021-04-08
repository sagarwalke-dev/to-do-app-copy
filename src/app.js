//Load module
const express=require('express');
const path=require('path');
const task=require('./task');
const bodyParser=require('body-parser');
const app=express();
require('dotenv').config();

//setup satic middelware
app.use(express.static(path.join(__dirname,'../public')));

//configure body parser to read post method data
app.use(bodyParser.urlencoded({
    extended:true
}));

//setup view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'../template/views'));


//add task
app.post('/addtask',function(req,res){
    // d=new Date(req.body.date);
    // console.log(d.toLocaleTimeString('it-IT'));
    var result=task.addTask(req.body.id,req.body.task,req.body.desc,req.body.date);
    result.then(data=>{
        if(data!=null){
        console.log('Task Added...');
        res.render('index',{status:'Task Added successfully'});
    }
        else{
            console.log('failed to add');
            res.render('index',{status:'Failed to add Task'});
        }
    });
});

//all task
app.get('/allTask',function(req,res){
    var result=task.getAllTask();
    result.then(data=>{
        res.render('all-task',{tasks:data});    
    });
});

//find task by id
app.get('/editTask',function(req,res){
    task.getTaskById(Number(req.query.id)).then(data=>{
        res.render('update-task',{task:data});
    });
});

//update task

app.post('/updateTask',function(req,res){
    task.updateTask(req.body.id,req.body.status).then(data=>{
        
        if(data.nModified>0){
            console.log('task status updated...');
            res.render('index',{status:'Task Updated Successfully'});
        }
        else{
            console.log('failed to update');
            res.render('index',{status:'Failed to update Task'});
        }
    });
});

//delete task
app.get('/deleteTask',function(req,res){
    task.deleteTaskById(Number(req.query.id)).then(data=>{
        if(data.deletedCount>0){
            console.log('task status deleted...');
            res.render('index',{status:'Task Deleted Successfully'});
        }
        else{
            console.log('failed to delete');
            res.render('index',{status:'Failed to delete Task'});
        }
    });
});

//pending task
app.get('/pendingTask',function(req,res){
    task.pendingTask().then(data=>{
        res.render('pending-task',{tasks:data});    
    });

});

//completed task
app.get('/completedTask',function(req,res){
    task.completedTask().then(data=>{
        res.render('completed-task',{tasks:data});    
    });

});

//Handle 404 error here
app.get('*',function(req,res){
    res.redirect('/error.html');
});
//config port for express server 
app.listen(process.env.PORT || 3000,()=>{
    console.log('server started...');
});