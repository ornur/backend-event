const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    images: {
        type: [String], // Array of picture URLs
        required: true
    },
    names: {
        type: {
            english: String,
            russian: String
        },
        required: true
    },
    descriptions: {
        type: {
            english: String,
            russian: String
        },
        required: true
    },
    timestamps: {
        created: {
            type: Date,
            default: Date.now
        },
        updated: {
            type: Date,
            default: Date.now
        },
        deleted: {
            type: Date,
            default: null
        }
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
