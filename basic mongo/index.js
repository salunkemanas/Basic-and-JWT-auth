const express = require("express");                 //importing the express library
const app = express();                              //creating an express instance
const adminRouter = require("./routes/admin");      //importing the admin routes that will go on top of /admin route
const userRouter = require("./routes/user");        //importing the user routes that will go on top of /user route


const PORT = 3000;
app.use(express.json())                             //middleware for parsing req bodies
                                                    //every route will now use this middleware, don't have to write it explicitly
app.use("/admin", adminRouter);                     //every endpoint like /admin/... will be redirected to adminRouter
app.use("/user", userRouter);

app.listen(PORT, ()=>{
    console.log(`server started on port ${PORT}`);  //is port pe server start hoga aur listen karega
})





















// const mongoose = require("mongoose")
// mongoose.connect("mongodb+srv://123cactusjuice:YVwRE8Fcd3Iiutjd@cluster0.gfnwyso.mongodb.net/NewApp")

// const User = mongoose.model("Users", { name: String , email:String, password: String})

// const user = new User({name: "manas", email:"123@gmail.com", password:"1234"})
// user.save()
