const { createColumn, getColumns, updateColumn, deleteColumn } = require('../controlesrs/column');
const checkAuth = require('../middelwars/checkAuth');
const { validateBody } = require('../middelwars/validateBody');
const { columSchema } = require('../modules/Colum');
const route = require('express').Router();

//Get all columns 
route.get('/get-columns/:boardName', checkAuth, getColumns)

//Create a column
route.post('/create-column/:boardName', checkAuth, validateBody(columSchema), createColumn)

//Update column 
route.put('/update-column/:columnId', checkAuth, updateColumn);

//Delate column
route.delete('/delete-column/:columnId', checkAuth, deleteColumn)

module.exports = route;