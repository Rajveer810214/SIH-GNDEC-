const mongoose = require('mongoose');
const { Schema } = mongoose;

const markAttendance = new mongoose.Schema({
  status: { type: String, default: "absent" },
  eventIds: 
    {
      type: Schema.Types.ObjectId,
      ref: 'CreateEvents', // Reference the CreateEvents model
    },
  userIds: 
    {
      type: Schema.Types.ObjectId,
      ref: 'Students', // Reference the CreateEvents model
    },
    position: {
      type: Number,
      enum: [0, 1, 2, 3, 4],
      default: 0,
    },
});

module.exports = mongoose.model('markAttendance', markAttendance);
