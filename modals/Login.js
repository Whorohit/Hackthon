const mongoose = require('mongoose')
const LoginSchema = mongoose.Schema({
    password: {
        type: String,
        required: true,

    },
    userid: {
        type: String,
        required: true,

    },
    usertype: {
        type: String
    },

})
const Login = mongoose.model('LoginSchema', LoginSchema)
module.exports = Login



// firstname: {
//     type: String,
//     required: true,
// },
// lastname: {
//     type: String,
//     required: true,
// },
// dob: {
//     type: String,
//     require: true,
//     default: Date.now
// },
// password: {
//     type: String,
//     required: true,

// },
// mobile: {
//     type: Number,
//     max: 10
// },
// email: {
//     type: String,
//     required: true,

// },
// user: {
//     type: String
// },
// profilephoto: {

//     type: String
// },
// address:
// {
//     type: String
// },
// pincode: {
//     type: Number,
//     max: 6
// },
// course:
// {
//     type: String,
// },
// deptartment: {
//     type: String,

// },
// section: {
//     type: String,
// },
// year: {
//     type:Number
// },
// rollno:{
//     type:String
// },



