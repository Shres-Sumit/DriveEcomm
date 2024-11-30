const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { userInfo } = require("../models/userModel");

const userSignIn = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, address, userName, password, confirmPassword } = req.body
        if (!firstName || !lastName || !email || !phone || !address || !userName || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        const existingUser = await userInfo.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }
        const existingUserwithuserName = await userInfo.findOne({ userName });
        if (existingUserwithuserName) {
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
        let newUser = new userInfo({
            firstName,
            lastName,
            email,
            phone,
            address,
            userName,
            hashPassword: bcrypt.hashSync(password, 10)
        })


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
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}




const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        const user = await userInfo.findOne({ email })
        if (!user) {
            return res.status(400).send({ message: "user not found" })
        }

        if (user && bcrypt.compareSync(password, user.hashPassword)) {
            const token = jwt.sign({
                userId: user._id,
                role: user.role
            }, process.env.Secret,
                { expiresIn: '7d' })

            res.status(200).send({ user: user.email, token: token })
        }
        else {
            res.status(400).send('password is wrong!');
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Internal server error', error: error.message })
    }
}

module.exports = { userSignIn, userLogin }