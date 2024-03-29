const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose');
const LoginSchema = require('./modals/Login');
const StudentInfo = require('./modals/Studentinfo');
const FacultyInfo = require('./modals/Facultyinfo');
const routes=require('./Auth/LoginAuth')
const routesforAdmin=require('./Route/Adminops')
 const routesforuser=require('./Route/userrops')
const app=express();
const port = 5000
app.use(cors());
app.use(express.json())
const mongodbsend=()=>{
    mongoose.connect('mongodb+srv://ram211296:root@cluster0.qtfhk4u.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 100000,
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
}
mongodbsend();
LoginSchema();
StudentInfo();
FacultyInfo();

app.post('/auth/login',routes)
app.post('/api/createnewuser',routesforAdmin)
app.post('/api/updateuser/:loginid',routesforAdmin)
app.get('/api/getinfo',routesforuser)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)})
// app.post('/api/signup',routes)