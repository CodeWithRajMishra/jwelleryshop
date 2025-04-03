const CustmoerModel= require("../models/customerModel");
const bcrypt = require('bcrypt');
const jwt =require("jsonwebtoken");
const custRegistration=async(req, res)=>{
 const    {name, address, city, contact,  email, password}=req.body;
 const saltRounds = 10; // 10 rounds is the default
 const salt = await bcrypt.genSalt(saltRounds);
 const hashedPassword = await bcrypt.hash(password, salt);         

 try {
     const Customer= await CustmoerModel.create({
        name:name,
    address:address, 
    city:city,
    contact:contact,
    email:email,
    password:hashedPassword
     })

     res.status(201).send({msg:"You are Succesfully Regtered!"});
 } catch (error) {
     console.log(error);
 }
}

const custLogin=async(req, res)=>{
    const { email, password}=req.body;
    try {
        const Customer= await CustmoerModel.findOne({email:email});
         
        if(!Customer)
        {
            res.status(400).send({msg:"Invalid Email ID!"});
        }

        const passwordMatch = await bcrypt.compare(password, Customer.password);
     
        if(!passwordMatch)
        {
            res.status(400).send({msg:"Invalid Password!"});
        }
    
   const token=jwt.sign({id:Customer._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
   res.status(200).send({token:token});
    } catch (error) {
        console.log(error);
    }
    

}


const custAuth=async(req, res)=>{
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
     try {
        const decodedToken = jwt.verify(token,  process.env.JWT_SECRET);
        console.log(decodedToken.id);
      const Customer = await CustmoerModel.findById(decodedToken.id).select("-password");

      console.log(Customer);

      res.status(200).send(Customer);
     
    } catch (error) {
         console.log(error);
     }
}




module.exports={
    custRegistration,
    custLogin,
    custAuth
}