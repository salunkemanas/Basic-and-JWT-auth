const { Router } = require("express");                    //getting router function from the express module
const router = Router();                                  //creating a router instance
const adminMiddleware = require("../middleware/admin");   //importing middleware
const { Admin, Course, User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

router.post("/signup", async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    //check if this user with this username already exists
    try{
        await Admin.create({
            username:username,                 //can use only username, password also. if its like a:a
            password:password
        })
        res.json({message:"User created Successfully"});
    } catch(e){
        res.json({message:e})
    }
});

// If admin exists (by checking the db) we create and send the jwt token.
router.post("/signin", async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = await Admin.find({
        username,
        password
    });
    if (user){
        const token = jwt.sign({
            username
        }, JWT_SECRET);
        res.json({
            token                        // this token will have to be sent as auth header for all routes containing adminMiddleware
        })                               // as adminMiddleware expects the token and decodes it to verify
    }

})


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

router.get("/courses", adminMiddleware, async (req,res)=>{
    const response = await Course.find({});
    res.json({
        courses: response
    })
});

module.exports = router;
