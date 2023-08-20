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


module.exports = { 
    createTask: ctrlWrapper(createTask),
    getTasks: ctrlWrapper(getTasks),
    updateTask: ctrlWrapper(updateTask),
    deleteTask: ctrlWrapper(deleteTask),
    filterTasks: ctrlWrapper(filterTasks)
}