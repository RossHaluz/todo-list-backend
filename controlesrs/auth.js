const { HttpError, ctrlWrapper } = require("../hellpers");
const { UserModule } = require("../modules/User");
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');

const {SECRET_KEY} = process.env;

const register = async (req, res) => {
const {name, password, email} = req.body;
const user = await UserModule.findOne({email});
if(user) { 
    throw HttpError(400, "User already exist")
}
const hashPassword = await bcrypt.hash(password, 10);
const newUser = await UserModule.create({
    name,
    email, 
    password: hashPassword
})

const payload = {
id: newUser._id
}

const token = await jwt.sign(payload, SECRET_KEY, {expiresIn: '24h'})
const createUser = await UserModule.findByIdAndUpdate(newUser._id, {token}, {new: true})

res.json({
    createUser,
    message: 'Success register'
})
}

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModule.findOne({email})
    if(!user){
        throw HttpError(404, "User not found")
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const payload = {
        id: user._id
    }
    const token = await jwt.sign(payload, SECRET_KEY, {expiresIn: '24h'})
    const loginUser = await UserModule.findByIdAndUpdate(user._id, {
        password: hashPassword,
        token
    }, {new: true})

    res.json({
        loginUser,
        message: 'Success login'
    })
}

const logout = async (req, res) => {
    const {id} = req.userId;
    const user = await UserModule.findById(id);
    if(!user){
        throw HttpError(404, "User not found")
    }
    await UserModule.findByIdAndUpdate(id, {token: ''})

    res.json({
        message: 'Success logout'
    })
}

const current = async (req, res) => {
    const {id} = req.userId;
    const user = await UserModule.findById(id);
    if(!user){
        throw HttpError(404, 'User not found')
    }

    res.json(user)
}

module.exports = {
    register: ctrlWrapper(register), 
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    current: ctrlWrapper(current)
}