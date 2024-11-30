const express = require('express')
const { createProduct, getAllProduct } = require('../controller/productController')
const uploadOptions = require('../upload/uploader')


const productRoute = express.Router()

productRoute.post('/create-product', uploadOptions.single('image'), createProduct)

productRoute.get('/getAllcars', getAllProduct)





module.exports = productRoute