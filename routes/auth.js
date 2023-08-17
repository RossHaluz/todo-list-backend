const { register, login, logout, current, update } = require('../controlesrs/auth');
const { validateBody, checkAuth, upload } = require('../middelwars');
const { authSchema } = require('../modules/User');
const route = require('express').Router();

//Register
route.post('/register', validateBody(authSchema), register);

//Login 
route.post('/login', validateBody(authSchema), login);

//Logout
route.post('/logout', checkAuth, logout);

//Current user
route.get('/current', checkAuth, current);

//Update user
route.put('/update', checkAuth, upload.single('avatar'), update)

module.exports = route;