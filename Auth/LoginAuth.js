const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const login = require('../modals/Login');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenkey = "mynamrisrohit";

router.post('/auth/login', [
    body('userid', 'email should  be proper ').isString(),
    body('password', 'password should be greater  than   7 characters').isLength({ min: 7 }),
    body('usertype ', 'please  provide user-type')
],
async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array(), success: false });
    }
    const { userid, password, usertype } = req.body;
    try {
        let user = await login.findOne({ userid, usertype: usertype });
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(req.body.password, salt);
        console.log(pass);
        if (!user) {
            return res.status(400).json({ success, errors: "enter with correct user name and  password" });
        }
        const pascomapre = await bcrypt.compare(password, user.password);
        if (!pascomapre) {
            return res.status(400).json({ success: false, errors: "enter with ddd correct user name and  password" });
        }
        const data = {
            user: {
                id: user.id,
                usertype: user.usertype,
                userid: user.userid
            }
        };
        var token = await jwt.sign(data, tokenkey, {
            expiresIn: '3h'
        });
        success = true;
        let userinfo = await login.findOne({ userid }).select("-password");
        res.status(200).json({ success: true, token, id: user._id, userinfo: userinfo });
        console.log(data ,'ttt');
    } catch (error) {
        res.status(500).send({ errors: "techincal error", success: false });
    }
});

module.exports = router;
