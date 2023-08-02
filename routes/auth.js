const { register, login, logout, current } = require('../controlesrs/auth');
const { validateBody, checkAuth } = require('../middelwars');
const { authSchema } = require('../modules/User');
const route = require('express').Router();

//Register
route.post('/register', validateBody(authSchema), register);

//Login 
route.post('/login', validateBody(authSchema), login);

//Logout
route.post('/logout', checkAuth, logout)

//Current user
route.get('/current', checkAuth, current)

module.exports = route;