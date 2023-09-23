const mongoose = require('mongoose');
const { Schema } = mongoose;

const markAttendance = new mongoose.Schema({
  checkIn: { type:String, default:"Not set"},
  status: { type: String, required: true },
  checkOut: { type:String, default:"Not set"},
  userIds: 
    {
      type: Schema.Types.ObjectId,
      ref: 'Students', // Reference the CreateEvents model
    },
});

module.exports = mongoose.model('markAttendance', markAttendance);
