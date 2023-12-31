const app = require("./app");
const mongoose = require('mongoose');

const {HOST_DB, PORT = 8888} = process.env;

mongoose.connect(HOST_DB).then(() => {
    console.log('Database connect success');
    app.listen(PORT)
}).catch((error) => {
    console.log(error.message);
    process.exit(1)
})

