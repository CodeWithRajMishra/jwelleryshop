const AdminModel= require("../models/adminModel");
const ProductModel= require("../models/productModel");

const adminLogin=async(req, res)=>{
    const { adminid, password} = req.body;
    try {
        const Admin= await AdminModel.findOne({adminid:adminid});         
        if (!Admin)
        {
            res.status(404).send({msg:"Invalid Admin Id!"});
        }
        if (Admin.password!=password)
        {
            res.status(404).send({msg:"Invalid Password!"});
        }
        res.status(200).send({msg:"You are Succesfully Login", Admin:Admin});
    } catch (error) {
        console.log(error);
    }
}


const addProduct=async(req, res)=>{
       console.log(req.files);
       const imageUrls=req.files.map(file=>file.path);
      const  {name, description, brand, category,price}=req.body;

      const Product = await ProductModel.create({
        name:name,
        description:description, 
        brand:brand,
        category:category,
        price:price,
        dfaultImage:imageUrls[0],
        images:imageUrls
      })
      res.status(200).send("PRoduct Succesfully save!!!");
}

const showProduct=async(req, res)=>{
      const Product= await ProductModel.find();
      res.status(200).send(Product);
}

module.exports={
    adminLogin,
    addProduct,
    showProduct
}