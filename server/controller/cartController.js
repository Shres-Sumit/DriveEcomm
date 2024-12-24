const { productCard } = require("../models/cartModel")
const CarProduct = require("../models/productModel")

const createCart = async (req, res) => {
    const { productIds } = req.body
    const user = req.userId
    if (!user) {
        return res.status(400).json({ message: " Provide a userId " })

    }
    if (!Array.isArray(productIds) || productIds.length === 0) {
        return res.status(400).json({ message: " Provide a userId and an array of productIds." })
    }
    try {
        let existingCart = await productCard.findOne({ userId: user })
        if (existingCart) {
            const newProductIds = productIds.filter(productId => !existingCart.productId.includes(productId))
            const duplicateProductIds = productIds.filter(productId => existingCart.productId.includes(productId))

            if (newProductIds.length > 0) {
                existingCart.productId.push(...newProductIds)
                await existingCart.save()
            }

            const duplicateProducts = await Promise.all(
                duplicateProductIds.map(async (productId) => {
                    const product = await CarProduct.findById(productId);
                    return {
                        productId,
                        name: product.title
                    }
                })

            )
            existingCart = await existingCart.populate('productId')
            return res.status(200).json({
                message: duplicateProducts.length > 0
                    ? 'Some products were already in the cart.'
                    : 'Cart updated successfully.',
                existingCart,
                addedProducts: newProductIds,
                duplicateProducts
            });
        }

        existingCart = new productCard({
            userId: user,
            productId: productIds,
        });
        await existingCart.save();

        // Populate car information
        existingCart = await existingCart.populate('productId')

        res.status(201).json({
            message: 'existingCart created successfully.',
            existingCart,
            addedProducts: productIds,
            duplicateProducts: []
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: 'internal error in cart controller', err })
    }

}

const getCartProducts = async (req, res) => {
    try {
        const cartProducts = await productCard.find({ userId: req.userId }).populate('productId')
        if (!cartProducts || cartProducts.length === 0) {
            return res.status(400).json({ success: false, message: "dont have any product in cart" })
        }

        res.status(200).json({ success: true, carts: cartProducts })
    } catch (error) {
        res.status(500).json({ message: 'internal error in cart controller', error })
    }
}

module.exports = { createCart, getCartProducts }