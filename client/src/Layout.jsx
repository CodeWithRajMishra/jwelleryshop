import Footer from "./components/Footer";
import Header from "./components/Header";
import TopNav from "./components/TopNav";
import { Outlet } from "react-router-dom";
const Layout=()=>{
    return(
        <>
        <div id="toppart">
        <Header/> 
        <TopNav/>
        </div>
             
            <Outlet/> 
            <Footer/>
        </>
    )
}

export default Layout;