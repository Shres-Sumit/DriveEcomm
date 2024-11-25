const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    hashPassword: {
        type: String,
        required: true
    },


}, { timestamps: true })



exports.user = mongoose.model("user", userSchema)

