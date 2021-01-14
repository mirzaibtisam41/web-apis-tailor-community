const mongoose = require("mongoose");
const SignupSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("SignupSchema", SignupSchema);