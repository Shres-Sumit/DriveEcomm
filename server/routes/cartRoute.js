const express = require('express')
const { requireSign } = require('../helper/jwt')
const { createCart, getCartProducts, deleteCartProduct } = require('../controller/cartController')

const cartRoute = express.Router()


cartRoute.post('/create-cart', requireSign, createCart)
cartRoute.get('/getCart', requireSign, getCartProducts)
cartRoute.delete('/deleteCart/:pid', requireSign, deleteCartProduct)


module.exports = cartRoute