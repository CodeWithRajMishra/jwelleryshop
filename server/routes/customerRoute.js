const express= require("express");
const route= express.Router();
const CustomerController= require("../controllers/customerController");

route.post("/registration", CustomerController.custRegistration);
route.post("/customerlogin", CustomerController.custLogin);
route.get("/userauthenticate", CustomerController.custAuth);
route.get("/getdata", CustomerController.custGetData);




module.exports=route;