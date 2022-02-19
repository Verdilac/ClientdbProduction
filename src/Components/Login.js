
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from '../Util/UserAuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Button, Form,Alert} from 'react-bootstrap';



export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate();
    //const [show, setShow] = useState(false);
    const [message, setMessage] = useState({ error: false, msg: "" });
 
    

    const handleSubmit = async (e) => {
        e.preventDefault();
       // setError("");
        
        try {
          await logIn(email, password);
          navigate("/home");
        } catch (err) {
          //setError(err.message);
          console.log(err.message)
          //setShow(true)
          setMessage({error:true,msg:err.message})
          
          
        }
      };


  return (
<div >

  <div className='background-overlay d-flex justify-content-center align-items-center'>
   <Form className='rounded p-4 p-sm-4'>
                <h1 className='font-weight-bold text-center pb-4'>
                    Login 
                </h1>
              
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" onChange={(e)=> setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"  onChange={(e)=> setPassword(e.target.value)}/>
                </Form.Group>
                <Button type="submit" className='btn-lg btn-dark btn-span' onClick={handleSubmit}>
                    Login
                </Button>

                
            </Form>


       </div>


       <div>
      {message.error   &&   (
           <Alert variant="danger" onClose={() => setMessage({error:false})} dismissible>
           <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
           <p>
            {message.msg}
           </p>
         </Alert>
            
       ) }
    </div>
        </div>

        
  )
}
