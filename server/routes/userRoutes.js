const express = require('express')
const { userSignIn, userLogin } = require('../controller/userController')

const userRoute = express.Router()

userRoute.post('/signup', userSignIn)
userRoute.post('/login', userLogin)



module.exports = userRoute