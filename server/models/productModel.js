const mongoose = require('mongoose');

const carProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    model: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
    },
    year: {
        type: Number,
        required: true,
        min: 1886,
        max: new Date().getFullYear() + 1
    },
    color: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    class: {
        type: String,
        required: true,

    },
    mileage: {
        type: Number,
        default: 0,
        min: 0
    },
    fuelType: {
        type: String,
        enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Hydrogen'],
        trim: true
    },
    transmission: {
        type: String,
        enum: ['Automatic', 'Manual', 'CVT'],
        trim: true
    },
    condition: {
        type: String,
        enum: ['New', 'Used'],
        default: 'New'
    },
    image: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});



const CarProduct = mongoose.model('CarProduct', carProductSchema);

module.exports = CarProduct;