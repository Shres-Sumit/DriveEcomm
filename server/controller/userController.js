const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const { userInfo } = require("../models/userModel");
const transporter = require('../helper/sendMail');

const otpStore = new Map();

const userSignIn = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, address, userName, password, confirmPassword } = req.body;


        if (!firstName || !lastName || !email || !phone || !address || !userName || !password || !confirmPassword)
            return res.status(400).json({ success: false, message: 'All fields are required' });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            return res.status(400).json({ success: false, message: 'Invalid email format' });

        if (await userInfo.findOne({ email }))
            return res.status(400).json({ success: false, message: 'Email already exists' });

        if (await userInfo.findOne({ userName }))
            return res.status(400).json({ success: false, message: 'Username already exists' });

        if (password !== confirmPassword)
            return res.status(400).json({ success: false, message: 'Passwords do not match' });

        if (password.length < 6)
            return res.status(400).json({ success: false, message: 'Password too short' });

        const newUser = new userInfo({
            firstName,
            lastName,
            email,
            phone,
            address,
            userName,
            hashPassword: bcrypt.hashSync(password, 10),
            isEmailVerified: false
        });

        await newUser.save();


        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

        otpStore.set(email, { otp, otpExpiry });


        await transporter.sendMail({
            from: process.env.MAILTRAP_USER,
            to: email,
            subject: 'Your OTP Code',
            html: `<p>Hi ${firstName},</p><p>Your OTP is:</p><h2>${otp}</h2><p>Expires in 15 mins.</p>`
        });

        res.status(201).json({
            success: true,
            message: 'User created. OTP sent to email.'
        });
    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
};







const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const user = await userInfo.findOne({ email });

        if (!user) {
            return res.status(400).send({ success: false, message: "User not found" });
        }

        if (user && bcrypt.compareSync(password, user.hashPassword)) {
            const token = jwt.sign(
                { userId: user._id },
                process.env.Secret,
                { expiresIn: '7d' }
            );

            res.status(200).send({
                success: true,
                user: user,
                token: token
            });
        } else {
            res.status(400).send({ success: false, message: 'Invalid password or email' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

const getAllUser = async (req, res) => {

    // console.log(req.user)
    try {
        const users = await userInfo.find()
        if (!users || !users.length === 0) {
            return res.status(400).json({ success: false, message: 'no users' })
        }
        res.status(200).json({ success: true, users: users })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Internal server error', error: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const updateData = req.body

        const updatedUser = await userInfo.findByIdAndUpdate(req.params.id, updateData, { new: true })
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Internal server error', error: error.message })
    }
}

const userResetPassword = async (req, res) => {
    const { email, password } = req.body
    const user = await userInfo.findOne({ email })
    if (!user) return res.json({ success: false, message: "User not found" })

    const hashPassword = bcrypt.hashSync(password, 10)
    user.password = hashPassword
    res.json({ success: true, message: "Password reset successful!" });
}

const emailCheck = async (req, res) => {
    const { email } = req.body
    const user = await userInfo.findOne({ email })
    if (!user) {
        return res.json({ success: false, message: "Email not found" });
    }

    res.json({ success: true });
}

module.exports = { userSignIn, userLogin, getAllUser, updateUser, userResetPassword, emailCheck }