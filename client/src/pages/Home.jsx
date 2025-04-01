import bgimg from "../images/slider-bg.jpg";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import axios from "axios";
import Base_URL from "../config/BaseUrl";
import Card from 'react-bootstrap/Card';
import { addtoCart } from "../cartSlice";
import { useDispatch } from "react-redux";

const Home=()=>{
  const [mydata, setMydata]= useState([]);
  const dispatch= useDispatch();


  const loadData=async()=>{
    let api=`${Base_URL}admin/showproduct`;
    try {
       const response = await axios.get(api);
       console.log(response.data);
       setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    loadData();
  }, [])


  const ans=mydata.map((key)=>{
    return(
      <>
         <Card style={{ width: '20rem' }}>
      <Card.Img variant="top" src={`${Base_URL}${key.dfaultImage}`} height="300"  />
      <Card.Body>
        <Card.Title>{key.name}</Card.Title>
        <Card.Text>
           <h4>{key.description}</h4>
           <h4>Brand : {key.brand}</h4>
           <h4>{key.category}</h4>
           <h2> Price : {key.price}</h2>
        </Card.Text>
        <Button variant="primary"
        onClick={()=>{dispatch(addtoCart({id:key._id, name:key.name, description:key.description, brand:key.brand, category:key.category, price:key.price, defaultImage:key.dfaultImage, images:key.images, qnty:1}))}}>Add to Cart</Button>
      </Card.Body>
    </Card>
      </>
    )
  });

    return(
        <>
          <div id="topbanner">
            <div className="bannerdata">

            <h1 className="heading">  Best Jewellery <br/>
         Collection </h1>
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem
<br/> <br/>
<Button variant="outline-warning">Shop Now!</Button>
        
            </div>
          </div>

          <div>

            <h1 align="center"> Our Premium Jwellries</h1>
            <div id="cardData">
            {ans}
            </div>
           

          </div>
         
        </>
    )
}

export default Home;