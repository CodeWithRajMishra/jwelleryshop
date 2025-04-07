import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Outlet } from "react-router-dom";

const AdminDashBoard=()=>{
 const navigate= useNavigate();

 const logout=()=>{
      localStorage.clear();
      navigate("/");
 }
  return(
        <>
          <div id="adminheader"> 
               <h1> Welcome To Admin Dashboard</h1>
           </div>
           <div id="adminname">
            Welcome {localStorage.getItem("admin")} ! 
            <a href="#" onClick={logout} >  Logout </a>
           </div> 
            <div id="adminArea">
                <div id="leftmenu">
                <Button variant="primary" onClick={()=>{navigate("addproduct")}}>Add Product</Button>
                <br /><br />
                <Button variant="primary">Manage Product</Button>
                <br /><br />
                <Button variant="primary"
                 onClick={()=>{navigate("customerorder")}}>Customer Orders</Button>
                </div>
                <div id="rightdata">
                
                 <Outlet/>
              
                </div>
            </div>



         
        </>
    )
}
export default AdminDashBoard;