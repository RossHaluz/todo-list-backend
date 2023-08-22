const { HttpError, ctrlWrapper } = require("../hellpers");
const { ColumModel } = require("../modules/Colum");
const { TaskModal } = require("../modules/Task");

const createTask = async (req, res) => {
  const {columnId} = req.params;
  const createTask = await TaskModal.create({...req.body, column: columnId});
  await ColumModel.findByIdAndUpdate(columnId, {
    $push: {tasks: createTask}
  })

  res.json(createTask)
}

const getTasks = async (req, res) => {
const tasks = await TaskModal.find();

if(!tasks){
  throw HttpError(404, 'Task not found')
}

res.json(tasks)

}

const updateTask = async (req, res) => {
const {taskId} = req.params;

const updateTask = await TaskModal.findByIdAndUpdate(taskId, {...req.body}, {new: true})
if(!updateTask) {
  throw HttpError(404, 'Task not found')
}

res.json(updateTask)
}

const deleteTask = async (req, res) => {
const {taskId} = req.params;
const deleteTask = await TaskModal.findByIdAndDelete(taskId)
if(!deleteTask){
  throw HttpError(404, 'Task not found')
}

res.json(deleteTask)
}

const filterTasks = async (req, res) => {
  const {filterName} = req.params;
  const tasks = await TaskModal.find({priority: filterName});
  if(!tasks){
    throw HttpError(404, 'Tasks not found')
  }
  res.json(tasks)
}

const dragTask = async (req, res) => {
  const {taskId} = req.params; 
  const {columnId, indexFrom, indexTo} = req.body;
  const task = await TaskModal.findById(taskId);
  const data = await ColumModel.findById(task.column);
  const currentTasks = data.tasks[indexFrom];

  data.tasks.splice(indexFrom, 1);
  await ColumModel.findByIdAndUpdate(data._id, {tasks: data.tasks}, {new: true});

  const column = await ColumModel.findById(columnId);

  column.tasks.splice(indexTo, 0, currentTasks);

  const result = await ColumModel.findByIdAndUpdate(column._id, {tasks: column.tasks}, {new: true});
  await TaskModal.findByIdAndUpdate(taskId, {column: columnId}, {new: true})
  res.json(result)
}


module.exports = { 
    createTask: ctrlWrapper(createTask),
    getTasks: ctrlWrapper(getTasks),
    updateTask: ctrlWrapper(updateTask),
    deleteTask: ctrlWrapper(deleteTask),
    filterTasks: ctrlWrapper(filterTasks),
    dragTask: ctrlWrapper(dragTask)
}