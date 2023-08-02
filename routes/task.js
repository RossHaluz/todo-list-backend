const { createTask, getTask, getToDoTasks, getInProgressTasks, getDoneTasks, updateTask } = require('../controlesrs/task');
const { checkAuth, validateBody, upload } = require('../middelwars');
const { taskSchema } = require('../modules/Task');
const route = require('express').Router();

//Get tasks in to do list
route.get('/todo-tasks', checkAuth, getToDoTasks);

//Get tasks in process list
route.get('/inprogress-tasks', checkAuth, getInProgressTasks);

//Get tasks in done list 
route.get('/done-tasks', checkAuth, getDoneTasks);

//Create task 
route.post('/create-task', checkAuth, validateBody(taskSchema), upload.single('image'), createTask);

//Update task
route.post('/update-task/:idTask', checkAuth, updateTask)

//Get task
route.get('/:idTask', checkAuth, getTask);


module.exports =  route;