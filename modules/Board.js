const Joi = require('joi');
const {Schema, model} = require('mongoose');

const BoardSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    background: {
        type: String
    },
    icon: {
        type: String
    },
    colums: {
        type: [Schema.Types.ObjectId],
        ref: 'Colum',
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const BoardModel = model('board', BoardSchema);

const boardSchema = Joi.object({
    title: Joi.string().required(),
    background: Joi.string(),
    icon: Joi.string()
})

module.exports = {
    BoardModel, 
    boardSchema
}