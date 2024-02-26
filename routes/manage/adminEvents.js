// routes/manage/events.js

const express = require('express');
const router = express.Router();
const User = require('../../model/User');
const { Types: { ObjectId } } = require('mongoose');
const Event = require('../../model/eventModel');

// GET all events
router.get('/', async (req, res) => {
    try {
        // Retrieve events data from the database
        const events = await Event.find();
        const isAdmin = req.session.isAdmin;
        if (req.session && isAdmin) {
            const users = await User.find({});
            // Render admin page with list of users
            res.render('manage/adminEvents', { users, isAdmin, events });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET a single event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST create a new event
router.post('/', async (req, res) => {
    try {
        const eventNameRussian = req.body.eventNameRussian;
        const eventNameEnglish = req.body.eventNameEnglish;
        const eventDescriptionRussian = req.body.eventDescriptionRussian;
        const eventDescriptionEnglish = req.body.eventDescriptionEnglish;
        const eventImage1 = req.body.eventImage1;
        const eventImage2 = req.body.eventImage2;
        const eventImage3 = req.body.eventImage3;

        const event = new Event({
            names: {
                russian: eventNameRussian,
                english: eventNameEnglish
            },
            descriptions: {
                russian: eventDescriptionRussian,
                english: eventDescriptionEnglish
            },
            images: [eventImage1, eventImage2, eventImage3]
        });
        await event.save();
        res.redirect('/adminEvents');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT update an event by ID
router.put('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (req.body.names && req.body.names.english && req.body.names.russian != null) {
            event.names = req.body.names;
        }
        if (req.body.descriptions && req.body.descriptions.english && req.body.descriptions.russian != null) {
            event.descriptions = req.body.descriptions;
        }
        if (req.body.images != null) {
            event.images = req.body.images;
        }
        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE a single event by ID
router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, { "timestamps.deleted": new Date() }, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        await res.event.deleteOne();
        res.redirect('/manage/adminEvents');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
