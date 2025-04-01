const express = require('express')
const { createProduct, getAllProduct, getImageProduct, getProductBySlug, getOneCar, deleteProduct } = require('../controller/productController')
const uploadOptions = require('../upload/uploader')


const productRoute = express.Router()
const imageRoute = express.Router()

productRoute.post('/create-product', uploadOptions.single('image'), createProduct)

productRoute.get('/getAllcars', getAllProduct)

productRoute.get('/getOneCar/:title', getOneCar)




productRoute.get('/:slug', getProductBySlug)
productRoute.delete('/delete/:id', deleteProduct)

imageRoute.get('/public/upload/:filename', getImageProduct)







module.exports = { productRoute, imageRoute }