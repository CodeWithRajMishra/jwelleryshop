import  {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import AdminDashBoard from "./admin/AdminDashBoard";
import AddProduct from "./admin/AddProduct";

const App=()=>{
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
          
          </Route>
        </Routes>
        <Routes>
           <Route path="admindashboard" element={<AdminDashBoard/>}>
            <Route path="addproduct" element={<AddProduct/>}/>
           
           
           </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;