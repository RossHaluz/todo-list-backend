const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const authRouter = require('./routes/auth');
const taskRouter = require('./routes/task');

const app = express();
app.use(express.json())
app.use(cors());

app.use("/api/user", authRouter);
app.use("/api/task", taskRouter)

app.use((req, res) => {
    res.status(404).json({message: "Not found"})
})

app.use((err, req, res, next) => {
    const {status = 500, message = 'Server error'} = err;
    res.status(status).json({message})
})


module.exports = app;