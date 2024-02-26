const express = require('express');
const session = require('express-session');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT;
const path = require('path');

// Connect to MongoDB Atlas
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
const { Types: { ObjectId } } = require('mongoose');

// Middleware for session management
app.use(session ({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());

// Middleware for parsing incoming request bodies
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/register', require('./routes/registerUser'));
app.use('/', require('./routes/login'));
app.use('/main', require('./routes/main'));
app.use('/admin', require('./routes/manage/admin'));
app.use('/adminEvents', require('./routes/manage/adminEvents'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message || 'Something went wrong!');
});

// Logout route
app.all('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Redirect the user to the login page after logout
            res.redirect('/');
        }
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});