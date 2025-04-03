import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiAdminFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Logo from "../images/logo.png";
import Form from 'react-bootstrap/Form';
import Base_URL from '../config/BaseUrl';
import axios from "axios";
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { MyContext } from '../LoginContext';
const Header=()=>{
   const [adminid, setAdminid]= useState("");
   const [password, setPassword]= useState("");
   const [show, setShow] = useState(false);
   const [show1, setShow1] = useState(false);
   const [messageApi, contextHolder] = message.useMessage();
    
   const {logedIn, setLogedIn, uname, uemail, setUname, setUemail} = useContext(MyContext);


   const [cusEmail, setCusEmail]= useState("");
   const [cusPassword, setCusPassword] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
   const navigate= useNavigate();
   const Product= useSelector(state=>state.mycart.cart);
   const ProLength= Product.length;


    const handleSubmit=async(e)=>{
     e.preventDefault();
     
     try {
        let api=`${Base_URL}admin/adminlogin`;
        const response= await axios.post(api, {adminid:adminid, password:password});
        console.log(response);
        messageApi.success(response.data.msg);
        setShow(false);
        localStorage.setItem("admin", response.data.Admin.name);
        navigate("/admindashboard");
     } catch (error) {
        messageApi.error(error.response.data.msg);
     }
    }

const customerLoginSubmit=async(e)=>{
  e.preventDefault();
  let api=`${Base_URL}customer/customerlogin`;
  try {
       const response = await axios.post(api, {email:cusEmail, password:cusPassword});
       console.log(response.data);
       localStorage.setItem("token", response.data.token);
       setShow1(false);
       setLogedIn(true)
       navigate("/");
  } catch (error) {
     alert(error.response.data.msg);
  }

}



const logout=()=>{
   localStorage.clear();
   setUname("")
   setUemail("");
   setLogedIn(false);
   navigate("/");  
}

    return(
        <>
         <div id="header">
            <div id="toplogo">
                 <img src={Logo} style={{width:"500px", height:"50px"}} /> 
            </div>
            <div id="topicons">
            <FaSearch />
         <FaHeart />
         <FaUser onClick={handleShow1} />
        <a href='#' onClick={()=>{navigate("cartdata")}}>
         <span> <FaShoppingCart  /> {ProLength} </span>
         </a>

         <RiAdminFill  onClick={handleShow} className='linkicon' />
         
        
         <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
       user description
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">
         Welcome : {uname}
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">
        Email : {uemail}
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={logout}>logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>



            </div>
         
         
         </div>


         <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Id</Form.Label>
        <Form.Control type="text" placeholder="Enter Admin ID"
        value={adminid} onChange={(e)=>{setAdminid(e.target.value)}} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
        value={password} onChange={(e)=>{setPassword(e.target.value)}} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
       Login
      </Button>
    </Form>


        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>



      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>User Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Email</Form.Label>
        <Form.Control type="email" value={cusEmail} onChange={(e)=>{setCusEmail(e.target.value)}}  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter Password</Form.Label>
        <Form.Control type="password" value={cusPassword} onChange={(e)=>{setCusPassword(e.target.value)}}    />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={customerLoginSubmit}>
       Login
      </Button>
    </Form>


        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      {contextHolder}
        </>
    )
}

export default Header;