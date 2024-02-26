// routes/registerUser.js

const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');

// GET route for rendering the registration form
router.get('/', (req, res) => {
    res.render('register', { error: null }); // Pass error as null initially
});

// Registration route
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('register', { error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        //redirect to '/' after successful registration
        res.redirect('/');
    } catch (error) {
        console.error('Registration error:', error);
        // Handle registration failure and pass the error to the template
        res.render('register', { error: 'Registration failed' });
    }
});

module.exports = router;
