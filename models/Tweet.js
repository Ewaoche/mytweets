const mongoose = require('mongoose');




SubjectSchema = new mongoose.Schema({
    tweet: {
        type: String,
        required: [true, 'please add tweet']
    },
    ImageUrl: {
        type: String,
        required: [true, 'please add imageurl']
    },

    comments: {
        type: Array
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Subject', SubjectSchema);