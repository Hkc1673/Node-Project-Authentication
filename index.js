const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config()

//import Routes
const authRoute = require("./routes/AuthRouter");

//Connect DB
mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log("connected DB")
);
//Middleware
app.use(express.json());


//Route Middleware

app.use("/api/user", authRoute);


app.listen(3000, () => {
    console.log("I'm listening on port")
});