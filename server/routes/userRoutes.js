const express = require('express')
const { userSignIn, userLogin, getAllUser } = require('../controller/userController')
const { requireSign, isAdmin } = require('../helper/jwt')

const userRoute = express.Router()

userRoute.post('/signup', userSignIn)
userRoute.post('/login', userLogin)
userRoute.get('/getAllUser', requireSign, isAdmin, getAllUser)
userRoute.get('/admin-auth', (req, res) => {
    try {

    }
    catch (err) {
        res.status(500).json({ Ok: false, message: 'Server error' });
    }
})






module.exports = userRoute