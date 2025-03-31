import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import Base_URL from '../config/BaseUrl';
const AddProduct=()=>{
     const [input, setInput] = useState({});
     const [image, setImage]=useState("");
     const handleInput=(e)=>{
      let name=e.target.name;
      let value=e.target.value;
      setInput(values=>({...values, [name]:value}));
      console.log(input);
    }

    const handleImage=(e)=>{
       // console.log(e.target.files);
        setImage(e.target.files);
        console.log(image);
    }


    const handleSubmit=async(e)=>{
        e.preventDefault();
        let api=`${Base_URL}admin/addproduct`;
        const formData= new FormData();
        for (let key in input) {
            formData.append(key, input[key]);
          }
        
          for (let i = 0; i < image.length; i++) {
            formData.append('image', image[i]);
          }  
          
          try {
            const response = await axios.post(api, formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
             alert("file upload!!!");
          } catch (error) {
             console.log(error)
          }
    }


    return(
        <>
          <Form style={{width:"300px"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product name</Form.Label>
        <Form.Control type="text"  name="name" onChange={handleInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text"   name="description" onChange={handleInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Brand</Form.Label>
       
        <Form.Select aria-label="Default select example" name="brand"
        onChange={handleInput}>
      <option>Select Brand </option>
      <option value="Tanishq">Tanishq</option>
      <option value="Giva">Giva</option>
      <option value="Anand">Anand</option>
      <option value="Kalyan">Kalyan</option>
    </Form.Select>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Brand</Form.Label>
       
        <Form.Select aria-label="Default select example" name="category"
        onChange={handleInput}>
      <option>Select Category </option>
      <option value="Diamond">Diamond</option>
      <option value="Gold">Gold</option>
      <option value="Silver">Silver</option>
      <option value="Platinum">Platinum</option>
    </Form.Select>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" name="price" onChange={handleInput}  />
      </Form.Group>
     
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control type="file"  multiple  onChange={handleImage}  />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
        </>
    )
}

export default AddProduct;