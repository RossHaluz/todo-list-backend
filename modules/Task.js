const Joi = require("joi");
const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true
  },
  priority: {
    type: String,
    enum: ["Without priority", "Low", "Medium", "High"],
    default: "Low",
    require: true,
  },
  deadline: {
    type: String,
    require: true
  }, 
  column: {
    type: Schema.Types.ObjectId,
    require: true
  }
}, {versionKey: false, timestamps: true});

const TaskModal = model('task', TaskSchema);

const taskSchema = Joi.object({
  title: Joi.string().required(),
  desc: Joi.string().required(),
  priority: Joi.string().required(),
  deadline: Joi.string().required(),
})

module.exports = {
  TaskModal,
  taskSchema
}

