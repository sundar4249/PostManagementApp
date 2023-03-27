const { getAllUsers, registerController, loginController } = require('../contollers/userController');
const express = require('express');

//creating router object

const router = express.Router();

//Get all users || get(get method)
router.get('/all-users', getAllUsers)

//create user || post (post method)
router.post('/register', registerController)

//Login || post (post method)
router.post('/login', loginController)

module.exports = router