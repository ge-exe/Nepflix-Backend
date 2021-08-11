const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
//when creating POST, when updating UPDATE or PUT, when fetching GET, deleting DELETE
//we are sending data when user registers what he puts in the form like usernaame in the req.body
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.SECRET_KEY
            ).toString(), //we are hashing the password with aes encyption one of the strongest there is          
    });

    try{
        const user =  await newUser.save();
        res.status(200).json(user); //send the data to server in json and if succesfull get 200 status 
    }catch(err){
        res.status(500).json(err); //if something goes worng on the server side
    }    
});

//LOGIN
router.post("/login", async (req, res) => {

    try{
        const user = await User.findOne({email: req.body.email});
        !user && res.status(401).json("wrong password or username"); //if no user error 401 not authenticated

        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password && 
        res.status(401).json("wrong password or username"); 

        //here we place the id and isadmin in a jwt token so that nobody can see it to 
        //change our user info and also is the token expires you have to login again
        //you can see the jwt token but need the secret key to use it 
        const accessToken = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin},
            process.env.SECRET_KEY, {expiresIn: "5d"} );

        //... to remove password out of info, we say hold the password but just give use info of user without it
        const {password, ...info} = user._doc;

        res.status(200).json({...info, accessToken});
    }catch(err){
       res.status(500).json(err); 
    }

});

module.exports = router;