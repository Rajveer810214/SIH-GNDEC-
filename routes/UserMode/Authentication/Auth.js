const express = require('express');
const router = express.Router();
const studentInfo = require('../../../models/CreateUserAccount');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const societyInfo = require('../../../models/createSocietyAccount');
// const Admin = require('../../../models/Admin');
const JWT_Token = process.env.JWT_TOKEN;
router.use(express.json());

router.post('/useraccount',
    body('name', 'name should have a minimum length of 3').isLength({ min: 3 }),
    body('password', 'password should have a minimum length of 5').isLength({ min: 5 }),
    body('email').custom((value) => {
        // Check if the email ends with "@gndec.ac.in"
        const emailRegex = /^[^\s@]+@(gmail\.com|gndec\.ac\.in)$/;
        if (!emailRegex.test(value)) {
            throw new Error('Invalid email format or email must end with gmail.com or gndec.ac.in');
        }
        return true; // Return true if validation passes
    }),
    body('phone').custom((value) => {
        // Check if the phone number is exactly 10 digits and doesn't start with "0"
        if (!/^[1-9]\d{9}$/.test(value)) {
            throw new Error('Invalid phone number. It should be exactly 10 digits and should not start with "0"');
        }
        return true; // Return true if validation passes
    }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: "Invalid Credentials", errors: errors.array() });
        }
        const validateUser = await studentInfo.findOne({ email: req.body.email });
        const validatephone = await studentInfo.findOne({ phone: req.body.phone });
        if (validateUser) {
            return res.status(400).json({ success: false, message: 'email' });
        }
        if (validatephone) {
            return res.status(400).json({ success: false, message: 'phone' });
        }
        try {
            const myPlaintextPassword = req.body.password;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(myPlaintextPassword, salt);
            const { name, email, phone, gender, progressValue } = req.body;
            // Find the maximum jersey number assigned
            const studentDetail = await studentInfo.create({
                name: name,
                email: email,
                password: hash,
                phone: phone,
                gender: gender,
                progressValue: progressValue,
                isVerified: false,
            });
            await studentDetail.save();
            console.log(req.body)

            // Instead of returning just progressValue, return the entire studentDetail object
            return res.status(201).json({ success: true, studentDetail });
        } catch (error) {
            res.status(400).json({ success: false, message: error.keyValue });
        }
    }
);
router.post('/societyaccount',
    body('name', 'name should have a minimum length of 3').isLength({ min: 3 }),
    body('password', 'password should have a minimum length of 5').isLength({ min: 5 }),
    body('email').custom((value) => {
        // Check if the email ends with "@gndec.ac.in"
        const emailRegex = /^[^\s@]+@(gmail\.com|gndec\.ac\.in)$/;
        if (!emailRegex.test(value)) {
            throw new Error('Invalid email format or email must end with gmail.com or gndec.ac.in');
        }
        return true; // Return true if validation passes
    }),
    body('phone').custom((value) => {
        // Check if the phone number is exactly 10 digits and doesn't start with "0"
        if (!/^[1-9]\d{9}$/.test(value)) {
            throw new Error('Invalid phone number. It should be exactly 10 digits and should not start with "0"');
        }
        return true; // Return true if validation passes
    }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: "Invalid Credentials", errors: errors.array() });
        }
        const validateUser = await studentInfo.findOne({ email: req.body.email });
        const validatephone = await studentInfo.findOne({ phone: req.body.phone });
        if (validateUser) {
            return res.status(400).json({ success: false, message: 'email' });
        }
        if (validatephone) {
            return res.status(400).json({ success: false, message: 'phone' });
        }
        try {
            const myPlaintextPassword = req.body.password;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(myPlaintextPassword, salt);
            const { name, email, phone, gender,convenername, progressValue } = req.body;
            // Find the maximum jersey number assigned
            const societyDetail = await societyInfo.create({
                name: name,
                email: email,
                password: hash,
                phone: phone,
                gender: gender,
                convenername:convenername,
                progressValue: progressValue,
                isVerified: false,
            });
            await societyDetail.save();
            // Instead of returning just progressValue, return the entire studentDetail object
            return res.status(201).json({ success: true, societyDetail });
        } catch (error) {
            res.status(400).json({ success: false, message: error.keyValue });
        }
    }
);

router.post('/login', body('password', 'password should have a minimum length of 5').isLength({ min: 5 }), body('email').custom((value) => {
    // Check if the email ends with "@gndec.ac.in"
    const emailRegex = /^[^\s@]+@(gmail\.com|gndec\.ac\.in)$/;
    if (!emailRegex.test(value)) {
        throw new Error('Invalid email format or email must end with gmail.com or gndec.ac.in');
    }
    return true; // Return true if validation passes
}), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: "Invalid Credentials", errors: errors.array() });
    }
    const { email, password } = req.body;
      const societyEmail = await societyInfo.findOne({ email });
      if (societyEmail) {
        const passwordCompare = await bcrypt.compare(password, societyEmail.password);
        if (passwordCompare) {
          const data = {
            society: {
              id: societyEmail.id,
              role: societyEmail.role
            }
        }
            if (societyEmail.isVerified === true) {
                const authToken = jwt.sign(data, JWT_Token);
                return res.status(200).json({ success: true, authtoken: authToken });
            }
            else {
                return res.status(200).json({ success: false, message: "Please verify your account" });
            }
          }
          
          
    
      }
    const student = await studentInfo.findOne({ email });
    if (!student) {
        return res.status(400).json({ success: false, message: "User Not found" });
    }
    const passwordCompare = await bcrypt.compare(password, student.password);
    if (passwordCompare) {
        const data = {
            student: {
                id: student.id,
                role: student.role
            }
        }
        if (student.isVerified === true) {
            const authToken = jwt.sign(data, JWT_Token);
            return res.status(200).json({ success: true, authtoken: authToken });
        }
        else {
            return res.status(200).json({ success: false, message: "Please verify your account" });
        }
    }
    return res.status(400).json({ success: false, message: "Please try to login with the correct credentials" });
});

module.exports = router;