const Joi = require('joi');
const {Schema, model} = require('mongoose');

const BoardSchema = new Schema({
    title: {
        type: String,
        unique: true,
        require: true,
    },
    background: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    },
    colums: {
        type: [Schema.Types.ObjectId],
        ref: 'Colum',
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {versionKey: false, timestamps: true})

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