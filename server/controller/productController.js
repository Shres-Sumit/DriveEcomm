const slugify = require('slugify')
const path = require('path');
const fs = require('fs')


const CarProduct = require("../models/productModel")

const createProduct = async (req, res) => {
    try {
        const { title, model, year, color, price, description, milaege, fuelType, transmission, vehicleType } = req.body
        if (!title || !model || !year || !color || !price || !description || milaege || fuelType || transmission) {
            res.status(400).json({ success: false, message: "please fill all the fields" })
        }

        const file = req.file;
        console.log(file);

        if (!file) return res.status(400).send('No image in the request')
        const filename = file.filename

        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
        let car = new CarProduct({
            title,
            model,
            year,
            color,
            price,
            description,
            slug: slugify(title),
            image: `${basePath}${filename}`
        })
        car = await car.save()
        if (!car)
            return res.status(500).send('The product cannot be created')

        else {
            res.status(201).json({ success: true, car })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const productList = await CarProduct.find();
        if (!productList) {
            res.status(500).json({ success: false })
        }
        res.status(200).send({ success: true, productList });
    }

    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }
}

const getImageProduct = async (req, res) => {
    const filename = req.params.filename
    console.log(filename)
    const imagePath = path.join(__dirname, 'public/uploads', filename)
    console.log(imagePath)
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Image not found' })
        }

        res.sendFile(imagePath)
    })
}

module.exports = { createProduct, getAllProduct, getImageProduct }