const { Router } = require("express");                    //getting router function from the express module
const router = Router();                                  //creating a router instance
const userMiddleware = require("../middleware/user");   //importing middleware
const { User, Course } = require("../db");

router.post("/signup", (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    //check if this user with this username already exists
    User.create({
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

router.get("/courses",async (req,res)=>{
    const response = await Course.find({});
    res.json({
        courses: response
    })
});

// Endpoint for user to buy a course
router.post("/courses/:courseId", userMiddleware, (req,res)=>{
    const courseId = req.params.courseId
    const username = req.headers.username
    User.updateOne({
        username:username
    },{
        "$push":{
            purchasedCourses: courseId
        }
    }).catch((e)=>{
        console.log(e);
    });
    res.json({
        message:"Purchase Complete"
    })
});

// endpoint for user to see his bought courses
router.get("/courses/purchasedCourses", userMiddleware, async (req,res)=>{
    const user = await User.findOne({
        username: req.headers.username
    });
    const courses = await Course.find({
        _id:{
            "$in": user.purchasedCourses
        }
    });
    res.send({
        courses:courses
    })
});

module.exports = router;