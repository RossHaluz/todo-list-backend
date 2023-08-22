const { createTask, getTasks, updateTask, deleteTask, filterTasks, dragTask } = require('../controlesrs/task');
const { checkAuth, validateBody, upload } = require('../middelwars');
const { taskSchema } = require('../modules/Task');
const route = require('express').Router();

//Get tasks
route.get('/get-tasks', checkAuth, getTasks);

//Create new task
route.post('/create-task/:columnId', checkAuth, validateBody(taskSchema), createTask);

//Update task 
route.put('/update-task/:taskId', checkAuth, updateTask);

//Delete task
route.delete('/delete-task/:taskId', checkAuth, deleteTask);

//Filter tasks
route.get('/filter-tasks/:filterName', checkAuth, filterTasks);

//Drag and drop task 
route.patch('/drag-task/:taskId', checkAuth, dragTask);

module.exports =  route;