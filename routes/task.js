const { createTask, getTasks } = require('../controlesrs/task');
const { checkAuth, validateBody, upload } = require('../middelwars');
const { taskSchema } = require('../modules/Task');
const route = require('express').Router();

//Get tasks
route.get('/get-tasks', checkAuth, getTasks);

//Create new task
route.post('/create-task/:columnId', checkAuth, validateBody(taskSchema), createTask);

module.exports =  route;