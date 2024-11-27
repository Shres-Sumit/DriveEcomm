const CarProduct = require("../models/productModel")

const createProduct = async (req, res) => {
    try {
        const { title, model, year, color, price } = req.body

        let car = new CarProduct({
            title,
            model,
            year,
            color,
            price
        })
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

module.exports = { createProduct }