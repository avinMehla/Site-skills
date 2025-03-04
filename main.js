const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect('mongodb address')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define a Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cid: { type: String, required: true },
  mail: { type: String, required: true },
  pass: { type: String, required: true },
  verified: { type: Number, required: true, default: 0 },
  randomNumber: { type: Number },
});

const User = mongoose.model('User', userSchema);

// Utility Functions
async function checkIfEmailExists(mail) {
  try {
    return !!(await User.findOne({ mail }));
  } catch (error) {
    console.error('Error checking email:', error);
    throw error;
  }
}

async function checkIfUserExists(mail, pt) {
  try {
    const user = await User.findOne({ mail });
    if (!user || user.verified !== 1) {
      return false;
    }
    const isPasswordValid = await bcrypt.compare(pt, user.pass);
    return isPasswordValid;
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
}

function tokengenrator(mail) {
  const SECRET_KEY = 'miki';
  return jwt.sign({ mail }, SECRET_KEY, { expiresIn: '24h' });
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "-----",
    pass: "-----",
  },
});

// Routes
app.post('/signup', async (req, res) => {
  try {
    const { name, cid, mail, pass } = req.body;
    if (!name || !cid || !mail || !pass) {
      return res.status(400).json({ error: 'Fill all the required fields' });
    }

    const userValidationSchema = z.object({
      name: z.string(),
      cid: z.string(),
      mail: z.string().email(),
      pass: z.string().min(8, 'Password must be at least 8 characters long'),
    });
    userValidationSchema.parse({ name, cid, mail, pass });

    if (await checkIfEmailExists(mail)) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const randomNumber = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;

    const newUser = new User({ name, cid, mail, pass: hashedPassword, verified: 0, randomNumber });
    await newUser.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: mail,
      subject: 'Verification OTP',
      text: `Your OTP is: ${randomNumber}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Email sending error:', error);
        return res.status(500).json({ error: 'Failed to send verification email' });
      }
    });

    res.status(201).json({ message: 'Pls verify your email.' });
  } catch (error) {
    console.error('Error signing up user:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.errors });
    } else {
      res.status(500).json({ error: 'An error occurred while signing up the user' });
    }
  }
});

app.post('/signin', async (req, res) => {
  try {
    const { mail, pass } = req.body;
    if (!await checkIfUserExists(mail, pass)) {
      return res.status(403).json({ msg: "Invalid email or password." });
    }
    const user = await User.findOne({ mail });
    if(!user.verified){
        return res.json({msg : "verify your email first"})
    }
    const token = tokengenrator(mail);
    res.json({ token });
  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ msg: "Server error occurred." });
  }
});

app.post('/verification', async (req, res) => {
  try {
    const { mail, vcode } = req.body;
    const user = await User.findOne({ mail });
    if (!user || user.randomNumber !== vcode) {
      return res.status(400).json({ msg: 'Invalid credentials or verification code.' });
    }
    user.verified = 1;
    await user.save();
    const token = tokengenrator(mail);
    res.json({ token });
  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({ msg: 'Server error occurred.' });
  }
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
