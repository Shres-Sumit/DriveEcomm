// models/purchaseModel.js

const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userInfo',
    },
    cars: [
        {
            carId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'CarProduct',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    carDetailsSnapshot: {
        title: String,
        model: String,
        year: Number,
        price: Number,
        image: String,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    purchasedAt: {
        type: Date,
        default: Date.now,
    },
    visitDate: {
        type: Date,
        default: null,
    },
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
