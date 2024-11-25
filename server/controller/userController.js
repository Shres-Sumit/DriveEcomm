const bcrypt = require('bcryptjs')

const { userInfo } = require("../models/userModel");
const { user } = require('../models/usernameModel');

const userSignIn = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, address } = req.body
        if (!firstName || !lastName || !email || !phone || !address) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        const existingUser = await userInfo.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }
        let user = new userInfo({
            firstName,
            lastName,
            email,
            phone,
            address,
        })


        user = await user.save()

        if (!user) {
            return res.status(400).json({ success: false, message: 'cannot register' })
        }

        res.status(201).json({ success: true, message: 'user regster successfully', user })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}


const userNaP = async (req, res) => {
    try {
        const { userName, password, confirmPassword } = req.body
        if (!userName || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }
        const existingUser = await user.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }
        const newUser = new user({
            userName,
            hashPassword: bcrypt.hashSync(password, 10)
        });

        const savedUser = await newUser.save();

        if (!savedUser) {
            return res.status(400).json({
                success: false,
                message: 'Failed to create user'
            });
        }

        const userResponse = savedUser.toObject();
        console.log(userResponse)
        delete userResponse.hashPassword;

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: userResponse
        });


    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Internal server error', error: error.message })
    }

}

module.exports = { userSignIn, userNaP }