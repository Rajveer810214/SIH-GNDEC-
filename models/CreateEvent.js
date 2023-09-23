const mongoose = require('mongoose');

const EventsDetails = new mongoose.Schema({
  EventName: { type: String, required: true, unique: true },
  SocietyName: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now, // This will set the date to the current date and time when a new document is created
  },
});

module.exports = mongoose.model('EventsDetails', EventsDetails);
