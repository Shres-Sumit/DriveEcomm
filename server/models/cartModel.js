const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    productId: [{
        type: mongoose.Types.ObjectId,
        ref: 'CarProduct',
        required: true
    }],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'userInfo',
    },
    addAt: {
        type: Date,
        default: Date.now
    }

})

exports.productCard = mongoose.model('productCard', cartSchema)