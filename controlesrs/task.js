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


module.exports = { 
    createTask: ctrlWrapper(createTask),
    getTasks: ctrlWrapper(getTasks)
}