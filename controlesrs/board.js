const { HttpError, ctrlWrapper } = require("../hellpers");
const { BoardModel } = require("../modules/Board");
const { ColumModel } = require("../modules/Colum");
const { TaskModal } = require("../modules/Task");
const { UserModule } = require("../modules/User");

const createNewBoard = async (req, res) => {
    const {id: owner} = req.userId;
   const result = await BoardModel.create({...req.body, owner})
   await UserModule.findByIdAndUpdate(owner, {
    $push: {boards: result}
   })

   res.json(result)
}

const getAllBoards = async (req, res) => {
    const {id} = req.userId;
    const user = await UserModule.findById(id);
    const list = await Promise.all(
        user.boards.map(({_id: boardId}) => {
           return  BoardModel.findById(boardId)
        })
    )

    res.json(list)
}

const getBoard = async (req, res) => {
const {boardName} = req.params;
const result = await BoardModel.findOne({title: boardName});
if(!result){
    throw HttpError(404, 'Board not found')
}

res.json(result)
}

const delateBoard = async (req, res) => {
const {id} = req.userId;
const {boardId} = req.params;
const board = await BoardModel.findById(boardId);
if(!board){ 
    throw HttpError(404, "Board not found")
}
const columns = await Promise.all(
    board.colums.map(item => {
        console.log('Hello 1');
       return ColumModel.findById(item);
    })
)

await Promise.all(
    columns.map(item => Promise.all(
        item.tasks.map(item => {
            console.log(item);
            return TaskModal.findByIdAndDelete(item)
        })
    ))
)

await Promise.all(
    board.colums.map(item => {
        console.log('Hello 3');
        return ColumModel.findByIdAndDelete(item)
    })
)

const findAndDelate = await BoardModel.findByIdAndDelete(boardId);
if(!findAndDelate){
    throw HttpError(404, 'Bord not found')
}

await UserModule.findByIdAndUpdate(id, {
    $pull: {boards: boardId}
})

res.status(200).json({
    data: findAndDelate,
    message: 'Board success delate'
})
}

const updateBoard = async (req, res) => {
const {boardId} = req.params;
const result = await BoardModel.findByIdAndUpdate(boardId, {...req.body}, {new: true});
if(!result){ 
    throw HttpError(404, 'Board not found')
}

res.json({
    data: result,
    message: "Board success update"
})
}

module.exports = {
    createNewBoard: ctrlWrapper(createNewBoard),
    getAllBoards: ctrlWrapper(getAllBoards),
    getBoard: ctrlWrapper(getBoard),
    delateBoard: ctrlWrapper(delateBoard),
    updateBoard: ctrlWrapper(updateBoard)
}