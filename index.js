const express = require("express");
const app = express();
const mongoose = require("mongoose");
const myRoutes = require("./routes/myRoutes");
const dotenv = require("dotenv");
dotenv.config();
const port = 3330;
const cookieParser = require("cookie-parser");
app.use(cookieParser()); 
const url = process.env.URL;


mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("We are connected to the db via port", port);
})
.catch((err)=>{
    console.log(err);
});


//EJS bit
app.set("view engine", "ejs");

//Routes

app.use("/", myRoutes); 

app.listen(port, ()=>{
    console.log("Hell with the server");
});