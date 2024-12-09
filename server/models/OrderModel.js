const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    customer:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userInfo",
        required: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarProduct",
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ["Pending", "Confirmed", "Delivered", "Canceled"],
        default: "Pending"
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ["Paid", "Pending", "Partially Paid"],
        default: "Pending"
    },
    totalAmount: { type: Number, required: true },
}, { timestamps: true });

const carOrder = mongoose.model("Order", orderSchema);

module.exports = carOrder
