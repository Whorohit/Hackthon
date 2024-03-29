const express = require('express')
const router = express.Router();
const fetchuser = require('../Middleware/Fetchuser')
const Student = require("../modals/Studentinfo")
const Faculty = require("../modals/Facultyinfo")
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');
const Login = require('../modals/Login');

allowedActions = ['ECE', 'CSE_AIML', 'ME', 'CSE_DS', 'CSE', 'IT'];
allowedtpye = ["Student", "Admin", "Faculty"]
router.post('/api/createnewuser', fetchuser, [
    body('userid', 'enter the username').isLength({ min: 8 }),
    body('password', 'enter the password').isLength({ min: 7 }),
    body('firstname', 'enter the firstname').isLength({ min: 2 }),
    body('lastname', ' enter the lastname').isLength({ min: 1 }),
    body('dob', 'enter the vaild  date').isLength({ min: 10, max: 10 }),
    body('mobile', 'enter the   price').isNumeric().isLength({ min: 10, max: 10 }),
    body('email', 'enter the vaild email').isEmail(),
    body('Rollno', 'enter the vaild Rollno').isString(),
    body('usertype', 'enter the vaild Rollno').isIn(allowedtpye).withMessage('Invalid  usertype'),
    body('department').isIn(allowedActions).withMessage('Invalid  department')
], async (req, res) => {
    try {
        if (req.user.usertype !== "Admin") {
            return res.status(400).json({ success: false, errors: "Not Allowed to normal user" });
        }
        const {
            firstname, lastname, dob, moblie, email, Rollno, year, Certificate,
            Achievement,
            department, usertype, profilephoto, address, pincode, course, idcard, section, userid, password, classes
        } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ errors: errorMessages, success: false });

        }
        let usr = await Login.findOne({ userid: req.body.userid })
        if (usr) {
            return res.status(400).json({ success: false, errors: "user id already Exists use differnent userid" });
        }
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password, salt);
        const newuser = new Login({ userid, password: pass, usertype })
        const saveuser = await newuser.save();
        if (!saveuser) {
            return res.status(400).json({ success: false, errors: "some error occur while creating new user" });
        }
        const { _id } = saveuser
        let savedata = {}
        if (usertype === "Student") {
            const newStudent = new Student({
                firstname, lastname, dob, moblie, email, Rollno, year, Certificate, loginid: _id,
                Achievement,
                department, profilephoto, address, pincode, course, idcard, section, classes
            })
            savedata = await newStudent.save();
        }
        if (usertype === 'Faculty') {
            const newFaculty = new Faculty({
                firstname, lastname, dob, moblie, email, Rollno, year, Certificate, loginid: _id,
                Achievement,
                department, profilephoto, address, pincode, course, idcard, section,
            })
            savedata = await newFaculty.save();
        }


        res.json({ savedata, success: true, message: "created successfully" })


    } catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: "Internal Server error", success: false });
    }
});
router.post('/api/updateuser/:loginid', fetchuser, [
    body('firstname', 'enter the firstname').isLength({ min: 2 }),
    body('lastname', ' enter the lastname').isLength({ min: 1 }),
    body('dob', 'enter the vaild  date').isLength({ min: 10, max: 10 }),
    body('mobile', 'enter the   price').isNumeric().isLength({ min: 10, max: 10 }),
    body('email', 'enter the vaild email').isEmail(),
    body('Rollno', 'enter the vaild Rollno').isString(),
    body('usertype', 'enter the vaild Rollno').isIn(allowedtpye).withMessage('Invalid  usertype'),
    body('department').isIn(allowedActions).withMessage('Invalid  department')
], async (req, res) => {
    try {
        if (req.user.usertype !== "Admin") {
            return res.status(400).json({ success: false, errors: "Not Allowed to normal user" });
        }
        const {
            firstname, lastname, dob, moblie, email, Rollno, year, Certificate,
            Achievement,
            department, usertype, profilephoto, address, pincode, course, idcard, section, userid, password, classes
        } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ errors: errorMessages, success: false });

        }

        let usr = await Login.findOne({ _id: req.params.loginid })
        if (!usr) {
            return res.status(400).json({ success: false, errors: "user does not exist " });
        }

        const { _id } = usr;
        let savedata = {};
        if (usertype === "Student") {
            let student = await Student.findOneAndUpdate({ loginid: _id }, {
                $set: {
                    firstname, lastname, dob, moblie, email, Rollno, year, Certificate, Achievement, department, profilephoto, address, pincode, course, idcard, section, classes
                }
            }, { new: true });
            savedata = student;
        }
        if (usertype === "Faculty") {
            let faculty = await Faculty.findOneAndUpdate({ loginid: _id }, {
                $set: {
                    firstname, lastname, dob, moblie, email, Rollno, year, Certificate, Achievement, department, profilephoto, address, pincode, course, idcard, section
                }
            }, { new: true });
            savedata = faculty;
        }

        console.log(savedata);
        res.json({ savedata, success: true, message: "updated successfully" })


    } catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: "Internal Server error", success: false });
    }
});


router.get('/api/Carddata', fetchuser, async (req, res) => {
    try {
        const { department, year, section, course, usertype, pagesize } = req.query;
        if (req.user.usertype !== "Admin") {
            return res.status(400).json({ success: false, errors: "Not Allowed to normal user" });
        }
        const pageSize = parseInt(pagesize) || 10;

        let query = {};
        let users = {}
        if (usertype === "Student") {
            query = { department, year, section, course }; // Customize as per your schema


            // Find documents matching the query and limit the result to pageSize
            users = await Student.find(query).limit(pageSize);
        }
        if (usertype === "Faculty") {
            query = { department };
            users = await Faculty.find(query).limit(pageSize); //

        }
        res.json({ success: true, users });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: "Internal Server error", success: false });
    }

}
)
module.exports = router;



