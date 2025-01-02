const express = require('express');
const jwt = require('jsonwebtoken');
const { userInfo } = require('../models/userModel');
const transporter = require('../helper/sendMail');

const verifyRoute = express.Router()

verifyRoute.get('/verify-email', async (req, res) => {
    try {
        const token = req.query.token;
        console.log(`verify token ${token}`)
        if (!token || typeof token !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Verification token is required',
            });
        }

        const decode = jwt.verify(token, process.env.Secret)
        console.log(`decode ${decode}`)
        const user = await userInfo.findById(decode.id)
        console.log(`user ${user}`)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        if (user.verified) {
            return res.status(400).json({
                success: false,
                message: 'User is already verified',
            });
        }

        user.verified = true;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
})

verifyRoute.get('/very', async (req, res) => {
    try {
        const mailOptions = {
            from: process.env.MAILTRAP_USER, // Your Gmail address
            to: 'recipient_email@example.com',
            subject: 'Test Email from Nodemailer',
            text: 'Hello! This is a test email sent using Gmail and Nodemailer.',
        };

        const result = await transporter.sendMail(mailOptions);
        return res.status(200).json({
            success: true,
            message: 'Test email sent successfully',
            result,
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
})

module.exports = verifyRoute