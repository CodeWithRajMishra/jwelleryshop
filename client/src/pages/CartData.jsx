import { useSelector, useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';
import Base_URL from "../config/BaseUrl";
import { FaPlusSquare } from "react-icons/fa";
import { FaMinusSquare } from "react-icons/fa";
import { qntyIncrease, qntyDecrease, productRemove } from "../cartSlice";
import { MdDelete } from "react-icons/md";
import { HiDocumentCurrencyRupee } from "react-icons/hi2";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
const CartData=()=>{
    const Product= useSelector(state=>state.mycart.cart);
    console.log(Product);
    const navigate = useNavigate();
    const dispatch= useDispatch();
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
                <td>{key.category}</td>
                <td>{key.description}</td>
                <td>{key.price}</td>
                <td>
                <FaMinusSquare  style={{fontSize:"25px", marginRight:"5px"}}
                 onClick={()=>{dispatch(qntyDecrease({id:key.id}))}}/>
                    {key.qnty}
                  
                    <FaPlusSquare style={{fontSize:"25px", marginLeft:"5px"}}  
                    onClick={()=>{dispatch(qntyIncrease({id:key.id}))}}/>

                </td>
                <td>{key.price * key.qnty}</td>
                <td>
                    <a href="#" style={{fontSize:"25px"}}
                    onClick={()=>{dispatch(productRemove({id:key.id}))}}>
                    <MdDelete/>
                    </a>
               
                </td>
               </tr>
            </>
        )
    })
 return(
        <>
          <h1 align="center"> My Cart </h1>
        <h4 align="center" style={{color:"green", fontWeight:"bold"}}>
        < HiDocumentCurrencyRupee /> : {totalAmount}</h4> 

        <h1 align="right">
        <Button variant="warning" onClick={()=>{navigate("/checkout")}}>CheckOut</Button>
            </h1>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
          <th> Total </th>
          <th></th>
        </tr>
      </thead>
        <tbody>
         {ans}
        </tbody>
        </Table>

        </>
    )
}
export default CartData;