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
        lowercase: true
    },
    description: {
        type: String,
        required: true
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
    vehicleType: {
        type: String,
        default: 'normal'
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
    stock: {
        type: Number,
        required: true,
        default: 1,
        min: 0
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
