const mongoose = require('mongoose')
const StudentInfoSchema = mongoose.Schema({
    loginid: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'LoginSchema'
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        require: true,
        default: Date.now
    },
   
    mobile: {
        type: Number,
        max: 10
    },
    email: {
        type: String,
        required: true,
    
    },
  
    profilephoto: {
    
        type: String
    },
    address:
    {
        type: String
    },
    pincode: {
        type: Number,
        min: 100000, // Adjust the minimum value according to your requirements
        max: 999999, 
    },
    course:
    {
        type: String,
    },
    department: {
        type: String,
    
    },
    section: {
        type: String,
    },
    year: {
        type:Number
    },
    Rollno:{
        type:String
    },
    idcard:{
         type:String
    },
    Certificate:{
        type: Array,

    },
    
Achievement:{
        type:Array
    }



    
    
    
})
const StudentInfo = mongoose.model('StudentInfo', StudentInfoSchema)
module.exports = StudentInfo




