const { createNewBoard, getAllBoards, getBoard, delateBoard, updateBoard } = require('../controlesrs/board');
const checkAuth = require('../middelwars/checkAuth');
const { upload } = require('../middelwars/upload');
const { validateBody } = require('../middelwars/validateBody');
const { boardSchema } = require('../modules/Board');
const route = require('express').Router();

//Get all boards
route.get('/get-boards', checkAuth, getAllBoards);

//Get board
route.get('/get-board/:boardName', checkAuth, getBoard)

//Add new board
route.post('/create-board', checkAuth, validateBody(boardSchema), createNewBoard);

//Delate board
route.delete('/delate-board/:boardId', checkAuth, delateBoard);

//Update board
route.put('/update-board/:boardId', checkAuth, updateBoard);

module.exports = route;