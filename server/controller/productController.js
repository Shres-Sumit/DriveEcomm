const slugify = require('slugify')
const path = require('path');
const fs = require('fs')


const CarProduct = require("../models/productModel")

const createProduct = async (req, res) => {
    try {
        const {
            title,
            model,
            year,
            color,
            price,
            description,
            mileage,
            fuelType,
            transmission,
            vehicleType,
            stock // <-- Add stock from req.body
        } = req.body;

        if (!title || !model || !year || !color || !price || !description || !mileage || !fuelType || !transmission) {
            return res.status(400).json({ success: false, message: "Please fill all the required fields" });
        }

        const file = req.file;
        if (!file) return res.status(400).send('No image in the request');
        const filename = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

        const car = new CarProduct({
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
            vehicleType,
            mileage,
            stock: stock || 1
        });

        const savedCar = await car.save();

        if (!savedCar) {
            return res.status(500).send('The product cannot be created');
        }

        res.status(201).json({ success: true, car: savedCar });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message || "Something went wrong" });
    }
};


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
        res.status(500).json({ success: false, message: 'Server error', error: error.message })
    }
}
const getOneCar = async (req, res) => {
    try {
        const { title } = req.params
        const encodedTitle = encodeURIComponent(title);
        console.log(encodedTitle)
        const cars = await CarProduct.find({
            title: {
                $regex: decodeURIComponent(encodedTitle), $options: "i"
            }
        })
        if (!cars || cars.length === 0) {
            return res.status(404).json({ success: false, message: 'No cars found' });
        }
        res.status(200).json({ success: true, productList: cars });
    } catch (error) {
        console.log(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const car = await CarProduct.findById(req.params.id)
        if (!car) return res.status(404).json({ message: "car not found" })

        if (car.image) {
            const imagePath = path.join(__dirname, '../public/uploads', path.basename(car.image))
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            }
        }

        await CarProduct.findByIdAndDelete(req.params.id);

        res.json({ message: "Car deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const updateCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const updatedData = req.body;


        if (updatedData.stock > 10) {
            return res.status(400).json({ error: 'Stock cannot be more than 10' });
        }

        const updatedCar = await CarProduct.findByIdAndUpdate(carId, updatedData, { new: true });

        if (!updatedCar) {
            return res.status(404).json({ error: 'Car not found' });
        }

        res.status(200).json({ message: 'Car updated successfully', car: updatedCar });
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { createProduct, getAllProduct, getImageProduct, getProductBySlug, getOneCar, deleteProduct, updateCar }