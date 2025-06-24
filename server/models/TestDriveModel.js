const mongoose = require('mongoose')

const TestDriveSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userInfo',
        required: true
    },
    car_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarProduct'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const TestDriveBooking = mongoose.model('TestDriveBooking', TestDriveSchema)
module.exports = TestDriveBooking
