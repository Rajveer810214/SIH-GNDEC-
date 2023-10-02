const mongoose = require('mongoose');

const societySchema = new mongoose.Schema({
  // Other fields in the schema
  name: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique:true },
  gender: { type: String, required: true }, // Ensure "required: true" for the "gender" field
  progressValue: { type: Number, required: true },
  role: { type:String, default:'society' },
  convenername:{ type: String, required: true },
  isVerified:{ type: Boolean, required: true },
});
const societyInfo = mongoose.model('societyInfo', societySchema);

module.exports = societyInfo;