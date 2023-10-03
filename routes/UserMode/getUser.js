const express = require('express');
const router = express.Router();
const Events = require('../../models/CreateEvent');
const studentInfo = require('../../models/CreateUserAccount');
const societyInfo = require('../../models/createSocietyAccount');
const EventStudentDetails = require('../../models/EventStudentDetails'); // Assuming this is the correct path
const fetchuser = require('../../middleware/fetchUser');
const isSociety = require('../../middleware/isSociety');

router.use(express.json());

router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const id = req.student.id;
        if (!id) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const user = await studentInfo.findById(id).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        console.log(user);
        // Assuming EventStudentDetails has fields like crn and urn
        const eventDetails = await EventStudentDetails.findOne({ email: user.email });
        if (!eventDetails) {
            return res.status(400).json({ success: false, message: "User details not found in EventStudentDetails" });
        }

        // Now you have user details and additional details from EventStudentDetails
        const userDetails = {
            ...user.toObject(), // Convert Mongoose document to plain JavaScript object
            crn: eventDetails.crn,
            urn: eventDetails.urn,
        };

        return res.status(200).json({ success: true, user: userDetails });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: "Internal server error occurred" });
    }
});

  router.get('/societyuser', isSociety, async (req, res) => {
    try {
      const userId = req.society.id;
      console.log(userId)
      const user = await societyInfo.findById(userId).select("-password")
      console.log(user);
     res.status(200).json({ success:true, user });
    } catch (error) {
      res.status(400).json({success:false, message:"Internal server error occured"});
    }
  })

  module.exports = router;
