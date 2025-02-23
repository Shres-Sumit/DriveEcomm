const mongoose = require('mongoose')

const TestDriveSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userInfo',
        required: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarProduct'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const TestDriveBooking = mongoose.model('TestDriveBooking', TestDriveSchema)
module.exports = TestDriveBooking