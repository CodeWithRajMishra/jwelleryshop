const express = require("express");
const app=express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require('body-parser')
var cors = require('cors')
const path = require('path')
const adminRoute= require("./routes/adminRoute");
const customerRoute= require("./routes/customerRoute");
const paymentRoute = require("./routes/payment");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
mongoose.connect(process.env.DBCON).then(()=>{
    console.log("DB Succefully Connected!!!");
})

app.use("/admin", adminRoute);
app.use("/customer", customerRoute);
//Routing
app.use("/api/payment/",paymentRoute);




const port=process.env.PORT || 8000
app.listen(port, ()=>{
    console.log(`server run on port ${port}`)
})
