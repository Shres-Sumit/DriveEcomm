const carOrder = require("../models/OrderModel")
const CarProduct = require("../models/productModel")
const { userInfo } = require("../models/userModel")

const createOrder = async (req, res) => {
    const { totalAmount } = req.body
    try {
        const car = await CarProduct.findById(req.params.id)
        if (!car) return res.status(400).json({ success: false, message: 'car is not found' })
        const user = await userInfo.findById(req.userId)
        if (!user) return res.status(400).json({ success: false, message: 'user is not found' })
        let order = new carOrder({
            customer: req.userId,
            car: req.params.id,
            totalAmount
        })
        await order.save()

        order = await carOrder.findById(order._id).populate('customer').populate('car')

        res.status(200).json({ success: true, order })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createOrder }