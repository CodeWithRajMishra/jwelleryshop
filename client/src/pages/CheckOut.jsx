import { useEffect, useContext, useState } from "react";
import { MyContext } from "../LoginContext";
import Button from 'react-bootstrap/Button';

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';
import Base_URL from "../config/BaseUrl";
import { HiDocumentCurrencyRupee } from "react-icons/hi2";

import { useNavigate } from "react-router-dom";


const CheckOut=()=>{
const {logedIn} = useContext(MyContext);
const [cusData, setCusData] = useState({});
const navigate = useNavigate();
const dispatch= useDispatch();


const [shoe,setShoe] = useState({
  name: "Training Shoes",
  creator: "Nike",
  img: "https://images.pexels.com/photos/3490360/pexels-photo-3490360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  price: 500,
});




useEffect(()=>{
  if (!localStorage.getItem("userLogedin"))
  {
     navigate("/");
  }
  loadData();
}, []);


const loadData=async()=>{
  let api=`${Base_URL}customer/getdata?userid=${localStorage.getItem("userid")}`;

  try {
       const response = await axios.get(api);
       console.log(response.data);
       setCusData(response.data);
  } catch (error) {
     console.log(error);
  }

}


 const Product= useSelector(state=>state.mycart.cart);
    console.log(Product);
   
    let totalAmount=0;
    const ans=Product.map((key)=>{
        totalAmount+=key.price * key.qnty;
        return(
            <>
               <tr>
               <td>
                <img src={`${Base_URL}${key.defaultImage}`} width="80" height="60" />
                
                </td>
                <td>{key.name}</td>
                <td>{key.brand}</td>
                <td>{key.price}</td>
                <td>
                  {key.qnty}
                  
                </td>
                <td>{key.price * key.qnty}</td>
                               </tr>
            </>
        )
    })



    const initPay = (data) => {
      const options = {
        key : "rzp_test_pzkHWxo3sRdVQW",
        amount: data.amount,
        currency: data.currency,
        name: shoe.name,
        description: "Test",
        image:shoe.img,
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyURL = "https://localhost:8000/api/payment/verify";
            const {data} = await axios.post(verifyURL,response);
          } catch(error) {
            console.log(error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    };
    



    const handlePay = async () => {
      try {
        const orderURL = "http://localhost:8000/api/payment/orders";
        const {data} = await axios.post(orderURL,{amount: totalAmount});
        console.log(data);
        initPay(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    
    
    return(
        <>
          <h1 align="center"> Your Checkout Page </h1>
        
            <Table align="center" striped bordered hover style={{width:"400px"}}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th> Total </th>
                  </tr>
                </thead>
                  <tbody>
                   {ans}
                  </tbody>
                  </Table>
           
           <h4 align="center" style={{color:"green"}}> Your Total Paybale Amount : {totalAmount}</h4>
        
          <div style={{width:"300px", margin:"auto", fontSize:"20px", fontWeight:"bold"}}>
          Customer Name : {cusData.name}
          <br/>
          Shipping Address : {cusData.address}
          <br/>
          Contact no :  {cusData.contact}
          <br />
          Email :  {cusData.email}
          <br/>
          <br/>
           <Button onClick={handlePay} > Pay Now!</Button>
          <br/>   <br/>  <br/>

          </div>
            


     
        </>
    )
}

export default CheckOut;