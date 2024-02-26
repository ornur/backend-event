const express = require('express');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('login', { error: null});
});

// Login post route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            // Store user ID and username in session
            req.session.userId = user._id;
            req.session.username = user.username;
            req.session.isAdmin = user.adminStatus; // Store admin status in session

            //if user is admin, redirect to admin page
            if (user.adminStatus) {
                res.redirect('/admin')
            } else {
                res.redirect('/main');
            }
        }else{
            res.render('login', { error: 'Invalid username or password' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;