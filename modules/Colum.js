const Joi = require('joi');
const {Schema, model} = require('mongoose');

const ColumSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    tasks: {
        type: [Schema.Types.ObjectId],
        ref: 'Task'
    }
})

const ColumModel = model('culum', ColumSchema);

const columSchema = Joi.object({
title: Joi.string().required()
})

module.exports = {
    ColumModel,
    columSchema
}