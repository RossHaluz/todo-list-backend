const { HttpError, ctrlWrapper } = require("../hellpers");
const { TaskModal } = require("../modules/Task");
const { UserModule } = require("../modules/User");


const createTask  = async (req, res) => {
const {id} = req.userId;
  if(req.file){ 
    const {path} = req.file;
    const createTaskWithImg = await TaskModal.create({
       ...req.body,
        owner: id,
        img: path
    })
    await UserModule.findByIdAndUpdate(id, {
        $push: {tasks: createTaskWithImg}
    })
    return res.json({
        createTaskWithImg,
        message: "Task success created"
    })
  }

  const createTaskWithoutImg = await TaskModal.create({
    ...req.body,
    owner: id,
  })

  res.json({
    createTaskWithoutImg,
    message: "Task success created"
  })
}

const getTask  = async (req, res) => {
const  {idTask} = req.params;
const task = await TaskModal.findById(idTask);
if(!task){ 
    throw HttpError(404, "Task not found")
}

res.json(task)
}

const getToDoTasks = async (req, res) => {
    const {id} = req.userId;

    const toDoTasks = await TaskModal.find({owner: id, process: 'To do'})
    if(!toDoTasks){ 
      throw HttpError(404, "Tasks not found")  
    }
    res.json(toDoTasks)
}

const getInProgressTasks = async (req, res) => {
    const {id} = req.userId;

    const inProgressTasks = await TaskModal.find({owner: id, process: 'In process'})
    if(!inProgressTasks){ 
      throw HttpError(404, "Tasks not found")  
    }
    res.json(inProgressTasks)
}

const getDoneTasks  = async (req, res) => {
    const {id} = req.userId;

    const doneTasks = await TaskModal.find({owner: id, process: 'Done'})

    if(!doneTasks){ 
      throw HttpError(404, "Tasks not found")  
    }
    res.json(doneTasks)
}

const updateTask = async (req, res) => {
    const {id} = req.userId;
    const {idTask} = req.params;
    const task = await TaskModal.findOne({owner: id, _id: idTask})
    if(!task) {
        throw HttpError(404, 'Task not found')
    }
    const updateTask = await TaskModal.findByIdAndUpdate(task._id, {...req.body}, {new: true})

    res.json({
        updateTask,
        message: "Success update"
    })
}

module.exports = { 
    createTask: ctrlWrapper(createTask),
    getTask: ctrlWrapper(getTask),
    getToDoTasks: ctrlWrapper(getToDoTasks),
    getInProgressTasks: ctrlWrapper(getInProgressTasks),
    getDoneTasks: ctrlWrapper(getDoneTasks),
    updateTask: ctrlWrapper(updateTask)
}