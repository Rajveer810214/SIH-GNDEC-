const express = require('express');
const router = express.Router();
const studentInfo = require('../../models/EventStudentDetails');
const fetchuser= require('../../middleware/fetchUser')
router.use(express.json());

router.get('/getuser', fetchuser, async (req, res) => {
    let success = true;
    try {
      const userId = req.student.id;
      const user = await studentInfo.findById(userId).select("-password")
     res.status(200).json({ success, user });
    } catch (error) {
      success = false;
      res.status(400).json(success, "Internal server error occured");
    }
  })

  module.exports = router;
