//All the admin routes are defined here

const { Router } = require("express");                    //getting router function from the express module
const router = Router();                                  //creating a router instance
const adminMiddleware = require("../middleware/admin");   //importing middlewares
const { Admin, Course } = require("../db");

//signup endpoint
router.post("/signup", (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    //check if this user with this username already exists
    Admin.create({
        username:username,                 //can use only username, password also 
        password:password
    }).then(function(){
        res.json({
            message:"User created Successfully"
        })
    }).catch(function(){
        res.json({
            message:"User not created"
        })
    })
    
});

//Create course endpoint, admin middleware will do auth
router.post("/courses", adminMiddleware, async (req,res)=>{
    const title = req.body.title
    const description = req.body.description
    const imageLink = req.body.imageLink
    const price = req.body.price
    //use zod for input validation
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({
        message:"Course created successfully", 
        courseId: newCourse._id
    })
    
});

//See all courses
router.get("/courses", adminMiddleware, async (req,res)=>{
    const response = await Course.find({});
    res.json({
        courses: response
    })
});

module.exports = router;