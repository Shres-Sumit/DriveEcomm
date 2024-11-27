const express = require('express')
const { createProduct } = require('../controller/productController')


const productRoute = express.Router()

productRoute.post('/create-product', createProduct)





module.exports = productRoute