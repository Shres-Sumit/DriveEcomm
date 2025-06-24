const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    product_code: {
        type: String,
        required: true
    },
    transaction_uuid: {
        type: String,
        required: true,
        unique: true // important to prevent duplicate transactions
    },
    total_amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['COMPLETE', 'PENDING', 'FAILED'], // optional: for consistency
        required: true
    },
    transaction_code: {
        type: String,
    },
    signature: {
        type: String,
        required: true
    },
    signed_field_names: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserInfo',
        required: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarProduct',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
