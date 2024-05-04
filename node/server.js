const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Generate reset token function
const crypto = require('crypto');
function generateResetToken() {
    return crypto.randomBytes(20).toString('hex');
}

// Send reset instructions function
function sendResetInstructions(email, token) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Password Reset Instructions',
        text: `Please click the following link to reset your password: http://yourwebsite.com/reset-password?token=${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending reset instructions:', error);
        } else {
            console.log('Reset instructions sent:', info.response);
        }
    });
}

// Route to handle password reset requests
app.post('/forgot-password', (req, res) => {
    const userEmail = req.body.email;
    const resetToken = generateResetToken();
    sendResetInstructions(userEmail, resetToken);
    res.status(200).json({ message: 'Reset instructions sent successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
