const jwt = require("jsonwebtoken");

//here we make a middleware function to authenticate acces to certain features
//this will not be in the body but the headers
function verify(req, res, next){
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1]; //example token: "Bearer 86745684675468" 

        jwt.verify(token, process.env.SECRET_KEY, (err,user)=>{
            if(err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        })//what we did here is checked if the token is valid and if it is we get user info and move to the next function
    }else{
        return res.status(401).json("You are not authenticated.")
    }
}

module.exports = verify;