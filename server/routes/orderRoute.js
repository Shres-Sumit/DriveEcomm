const express = require('express')
const { createOrder } = require('../controller/orderController')
const { requireSign } = require('../helper/jwt')

const OrderRoute = express.Router()

OrderRoute.post('/createOrder/:id', requireSign, createOrder)

module.exports = OrderRoute