//Creating the schema and model(tables) of our database here

const mongoose = require("mongoose");     //importing mongoose library
mongoose.connect("mongodb+srv://123cactusjuice:YVwRE8Fcd3Iiutjd@cluster0.gfnwyso.mongodb.net/CoursesApp");

const AdminSchema = new mongoose.Schema({
    username:String,
    password:String
});

const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
});


const CourseSchema = new mongoose.Schema({
    title:String,
    description:String,
    imageLink:String,
    price:Number,
});



const Admin  = mongoose.model("Admin", AdminSchema);       //creating admin table in db using the admin schema
const User   = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

//exporting so that we can import them in the main index.js where we defined the general purpose app.use routes
module.exports = {          
    Admin,                  
    User,
    Course
}









