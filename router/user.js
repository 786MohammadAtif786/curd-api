const express = require('express');

const UserController = require('../controllers/users');
const { isLogdin } = require('../utils/auth')

const route = express.Router();

const userController = new UserController();

route.post('/register', userController.register());
route.post('/login', userController.login());

route.get('/users', userController.getUser());
route.get('/user', isLogdin(), userController.getUserById());

route.put('/user', isLogdin(), userController.updateUser());
route.delete('/user', isLogdin(), userController.deleteUserById());


module.exports = route;