//Middlewares for handeling authentication 

const { Admin } = require("../db/index")

function adminMiddleware(req,res,next){   //admin authentication logic 
    const username = req.headers.username;
    const password = req.headers.password;
    Admin.findOne({
        username: username,
        password: password
    }).then(function(value){
        if(value){
        next();
        } else {
            res.status(403).json({
                msg:"Admin does not exist"
            })
        }
    }).catch(function (error) {
        console.error("Error during admin authentication:", error);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    });
}

module.exports = adminMiddleware;