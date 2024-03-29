const express = require('express');
const router = express.Router();
const fetchuser = require('../Middleware/Fetchuser');
const Student = require("../modals/Studentinfo");
const Faculty = require("../modals/Facultyinfo");
const Login = require('../modals/Login');
const { validationResult } = require('express-validator');

router.get('/api/getinfo', fetchuser, async (req, res) => {
    try {
        // Check if the user is an admin
        if (!req.user.usertype 
            === "Admin"|| !req.user.usertype ==="Student" || !req.user.usertype === "Faculty" ) {
            return res.status(403).json({ success: false, errors: "Not allowed for users" });
        }

        // Retrieve the user ID from the authenticated user
        const userId = req.user.id;

        // Find the user in the database based on their user ID
        const user = await Login.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, errors: "User does not exist" });
        }

        let userData;

        // Depending on the user's type, fetch their information
        if (user.usertype === "Student") {
            userData = await Student.findOne({ loginid: userId });
        } else if (user.usertype === "Faculty") {
            userData = await Faculty.findOne({ loginid: userId });
        }

        // Check if the user data is found
        if (!userData) {
            return res.status(404).json({ success: false, errors: "User data not found" });
        }

        // Return the user data
        res.json({ success: true, userData });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: "Internal Server error", success: false });
    }
});

module.exports = router;
