const mongoose = require('mongoose')
const FacultyInfoSchema = mongoose.Schema({
    id: {
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
    user: {
        type: String
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
        max: 6
    },

    classes:
    {
        type: Array,
    },
    deptartment: {
        type: String,
    
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
const  FacultyInfo = mongoose.model('FacultyInfo', FacultyInfoSchema)
module.exports = FacultyInfo




