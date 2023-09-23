const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new mongoose.Schema({
  // Other fields in the schema
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  progressValue: { type: Number, required: true },
  course: { type: String, required: true },
  branch: { type: String, required: true },
  urn: { type: String, required: true, },
  year: { type: String, required: true },
  crn: { type: String, required: true,},
  eventIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CreateEvents', // Reference the CreateEvents model
    },
  ],
});

const studentInfo = mongoose.model('studentInfo', studentSchema);

module.exports = studentInfo;
