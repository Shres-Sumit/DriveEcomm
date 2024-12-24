const express = require('express')
const { requireSign } = require('../helper/jwt')
const { createCart, getCartProducts } = require('../controller/cartController')

const cartRoute = express.Router()


cartRoute.post('/create-cart', requireSign, createCart)
cartRoute.get('/getCart', requireSign, getCartProducts)

module.exports = cartRoute