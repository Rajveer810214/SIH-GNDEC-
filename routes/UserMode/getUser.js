const express = require('express');
const router = express.Router();
const studentInfo = require('../../models/CreateUserAccount');
const societyInfo = require('../../models/createSocietyAccount');
const fetchuser= require('../../middleware/fetchUser');
const isSociety = require('../../middleware/isSociety');
router.use(express.json());

router.get('/getuser', fetchuser, async (req, res) => {
    let success = true;
    try {
      const id = req.student.id;
      console.log(id);
      const user = await studentInfo.findById(id).select("-password")
      console.log(user);
     res.status(200).json({ success, user });
    } catch (error) {
      success = false;
      res.status(400).json(success, "Internal server error occured");
    }
  })
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
