const express = require('express');
const router = express.Router();
const User = require('../../model/User');
const bcrypt = require('bcrypt');
const { Types: { ObjectId } } = require('mongoose');

router.get('/', async (req, res) => {
    try{
        const isAdmin = req.session.isAdmin;
        if (req.session && isAdmin) {
            const users = await User.find({});
            // Render admin page with list of users
            res.render('manage/admin', { users, isAdmin });
        } else {
            res.redirect('/');
        }
    }catch(err){
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add', async (req, res) => {
    const { username, password } = req.body;

    try {        
        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.send('Username already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into database
        await User.create({
            username,
            password: hashedPassword
        });

        res.redirect('/admin');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/edit/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).send('User not found');
        }

        if (user.isAdmin) {
            return res.send('You cannot change admin\'s data');
        }

        res.render('manage/edit', { user, isAdmin: req.session.isAdmin });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/edit/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, password } = req.body;

    try {
        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user in database
        await User.updateOne({ _id: new ObjectId(userId) }, { $set: { username, password : hashedPassword } });

        res.redirect('/admin');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/delete/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        // Delete user from the user table
        await User.deleteOne({ _id: new ObjectId(userId) });

        res.redirect('/admin');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;