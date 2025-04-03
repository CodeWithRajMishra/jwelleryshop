import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Base_URL from '../config/BaseUrl';
import axios from 'axios';
const Registration=()=>{
  const [input, setInput] = useState({});

  const handleInput=(e)=>{
    let name= e.target.name;
    let value=e.target.value;
    setInput(values=>({...values, [name]:value}));
    console.log(input);
  }

  const handleSubmit=async(e)=>{
      e.preventDefault();
      let api=`${Base_URL}customer/registration`;
      try {
          const response=await axios.post(api, input);
          alert(response.data.msg);
      } catch (error) {
         console.log(error);
      }
  }

  return(
        <>
          <h1 align="center"> User Registration</h1>
          <div style={{width:"300px", margin:"auto"}}>
          <Form style={{width:"300px"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter name </Form.Label>
        <Form.Control type="text" name="name" onChange={handleInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Address </Form.Label>
        <Form.Control type="text" name="address" onChange={handleInput}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter City </Form.Label>
        <Form.Control type="text" name="city" onChange={handleInput}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Contact </Form.Label>
        <Form.Control type="text" name="contact" onChange={handleInput}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter email </Form.Label>
        <Form.Control type="email" name="email" onChange={handleInput}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" onChange={handleInput}  />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    <br /> <br/>
    </div>
        </>
    )
}

export default Registration;