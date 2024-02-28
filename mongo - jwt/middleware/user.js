const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
//Middlewares for handeling authentication 
function userMiddleware(req,res,next){   //user authentication logic
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1]
    const decodedValue = jwt.verify(jwtToken,  JWT_SECRET );
    if (decodedValue.username){
        req.username = decodedValue.username  //since we are sending jwt token and not username and password in the headers 
                                              //we need to add the username to the request body in this way
                                              //basically one middleware passing data to next middleware through request body
        next();                             
    } else{
        res.status(403).json({
            message:"You are not authenticated"
        })
    };
}

module.exports = userMiddleware;
