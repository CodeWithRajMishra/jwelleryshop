import  {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import AdminDashBoard from "./admin/AdminDashBoard";
import AddProduct from "./admin/AddProduct";
import CartData from "./pages/CartData";
import CheckOut from "./pages/CheckOut";
import Registration from "./pages/Registration";
import CustomerOrder from "./admin/CustomerOrder";

const App=()=>{
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="home" element={<Home/>}/>
            <Route path="cartdata" element={<CartData/>}/>
            <Route path="checkout" element={<CheckOut/>}/>
            <Route path="registration" element={<Registration/>}/>
          </Route>
        </Routes>
        <Routes>
           <Route path="admindashboard" element={<AdminDashBoard/>}>
            <Route path="addproduct" element={<AddProduct/>}/>
            <Route path="customerorder" element={<CustomerOrder/>}/>
           
           
           </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;