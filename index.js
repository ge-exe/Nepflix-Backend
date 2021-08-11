const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");


dotenv.config();

// a cluster  acts as an intermediary between the client and the server
//here we connect our mongo with our api
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    })
    .then(() => console.log("DB connection succesfull!"))
    .catch((err) => console.log(err));

app.use(express.json()); //so that the server accepts json

app.use("/api/auth", authRoute); //so we can use thet auth router
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

//to listen at localhost (8080 worst port btw dont use it)
app.listen(8800, ()=>{
    console.log("Backend server is running at http://localhost:8800 ")
});    