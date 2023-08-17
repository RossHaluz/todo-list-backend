const { HttpError, ctrlWrapper } = require("../hellpers");
const { BoardModel } = require("../modules/Board");
const { ColumModel } = require("../modules/Colum");
const {TaskModal} = require('../modules/Task');

const createColumn = async(req, res) => {
    const {boardName} = req.params;
    const {title} = req.body;
    const newColumn = await ColumModel.create({
        title
    })

    const board = await BoardModel.findOne({title: boardName})
    if(!board) {
        throw HttpError(404, 'Board not found')
    }
   await BoardModel.findByIdAndUpdate(board._id, {
        $push: {colums: newColumn}
    }, {new: true})

    res.json(newColumn)
}

const getColumns = async (req, res) => {
const {boardName} = req.params;
const board = await BoardModel.findOne({title: boardName});
const columns = await Promise.all(
    board.colums.map(({_id: columnId}) => {
        return ColumModel.findById(columnId)
    })
)

res.json(columns)
}

const updateColumn = async (req, res) => {
const {columnId} = req.params;
const {title} = req.body;

const result = await ColumModel.findByIdAndUpdate(columnId, {title}, {new: true});
if(!result){
    throw HttpError(404, "Column not found")
}

res.json(result)
}

const deleteColumn = async (req, res) => {
const {columnId} = req.params;
const column = await ColumModel.findById(columnId)
if(!column){
throw HttpError(404, 'Column not found')
}
await Promise.all(
    column.tasks.map(item => {
        return TaskModal.findByIdAndDelete(item)
    })
)
const deleteColumn = await ColumModel.findByIdAndDelete(columnId);
if(!deleteColumn) {
    throw HttpError(404, 'Column not found')
}

const board = await BoardModel.findOne({colums: columnId});
await BoardModel.findByIdAndUpdate(board._id, {$pull: {colums: columnId}}, {new: true})

res.json({
    data: deleteColumn,
    message: "Delete success column"
})
}
 

module.exports = {
    createColumn: ctrlWrapper(createColumn),
    getColumns: ctrlWrapper(getColumns),
    updateColumn: ctrlWrapper(updateColumn),
    deleteColumn: ctrlWrapper(deleteColumn)
}