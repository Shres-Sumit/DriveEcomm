const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const { userInfo } = require("../models/userModel");
const transporter = require('../helper/sendMail');

const userSignIn = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, address, userName, password, confirmPassword } = req.body
        if (!firstName || !lastName || !email || !phone || !address || !userName || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are need to be fullfilled',
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

        const token = jwt.sign(
            { id: savedUser._id, email: savedUser.email },
            process.env.Secret,
            { expiresIn: '1h' }
        )

        const verificationLink = `http://localhost:${process.env.PORT}/verify-email?token=${token}`
        const mailOption = {
            from: process.env.MAILTRAP_USER,
            to: savedUser.email,
            subject: 'Email Verification',
            html: `
                <p>Hi ${savedUser.firstName},</p>
                <p>Thank you for signing up. Please verify your email by clicking the link below:</p>
                <a href="${verificationLink}">Verify Email</a>
                <p>This link will expire in 24 hours.</p>
            `,
        }

        await transporter.sendMail(mailOption)

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

        if (!user.verified) {
            return res.status(403).json({
                success: false,
                message: 'Email not verified. Please verify your email before logging in.',
            });
        }

        if (user && bcrypt.compareSync(password, user.hashPassword)) {
            const token = jwt.sign({
                userId: user._id,
            }, process.env.Secret,
                { expiresIn: '7d' })

            res.status(200).send({ success: true, user: user, token: token })
            console.log(req.user)
        }
        else {
            res.status(400).send({ success: false, message: 'invalid password or email' });
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Internal server error', error: error.message })
    }
}
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