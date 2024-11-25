const express = require('express')
const { userSignIn, userNaP } = require('../controller/userController')

const userRoute = express.Router()

userRoute.post('/signup', userSignIn)
userRoute.post('/userNaP', userNaP)


module.exports = userRoute