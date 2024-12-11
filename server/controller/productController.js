const slugify = require('slugify')
const path = require('path');
const fs = require('fs')


const CarProduct = require("../models/productModel")

const createProduct = async (req, res) => {
    try {
        const { title, model, year, color, price, description, mileage, fuelType, transmission, vehicleType } = req.body
        if (!title || !model || !year || !color || !price || !description || !mileage || !fuelType || !transmission) {
            return res.status(400).json({ success: false, message: "please fill all the fields" })
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
            image: `${basePath}${filename}`,
            fuelType,
            transmission,
            vehicleType
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

const getProductBySlug = async (req, res) => {
    try {
        const car = await CarProduct.findOne({ slug: req.params.slug })
        if (!car) {
            return res.status(404).json({ success: false, message: 'car is existed' })
        }
        res.status(200).json({ success: true, car })
    } catch (error) {
        console.log(error)
        es.status(500).json({ success: false, message: 'Server error', error: error.message })
    }
}

const getOne = async (req, res) => {
    try {
        const { title } = req.query
        const car = await CarProduct.find({ title })
        if (!car) return res.status(400).json({ success: false, message: 'no car found' })

        res.send({ success: true, message: 'requested car found', car })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createProduct, getAllProduct, getImageProduct, getProductBySlug, getOne }