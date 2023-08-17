const { Schema, model, Types } = require("mongoose");
const Joi = require("joi");

const UserSchema = new Schema({
  name: { type: String, default: "" },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    default: ''
  },
  token: {
    type: String,
    default: ''
  },
 boards: {
  type: [Schema.Types.ObjectId],
  ref: 'Board'
 }
}, {versionKey: false, timestamps: true});

const UserModule = model("user", UserSchema);

const authSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

module.exports = {
  UserModule,
  authSchema,
};
