const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  sportId: {
    type: Schema.Types.ObjectId,
    ref: 'Sport',
    required: true,
  },
  attendance: {
    type: String,
    enum: ['not_marked', 'present', 'absent'],
    default: 'not_marked',
  },
  
});

module.exports = mongoose.model('Event', EventSchema);