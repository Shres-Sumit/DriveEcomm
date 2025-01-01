const express = require('express')
const { userSignIn, userLogin, getAllUser, updateUser } = require('../controller/userController')
const { requireSign, isAdmin } = require('../helper/jwt')

const userRoute = express.Router()

userRoute.post('/signup', userSignIn)
userRoute.post('/login', userLogin)
userRoute.get('/getAllUser', requireSign, isAdmin, getAllUser)
userRoute.get('/admin-auth', requireSign, isAdmin, (req, res) => {
    res.status(200).send({ Ok: true })
})
userRoute.patch('/:id', requireSign, updateUser)







module.exports = userRoute