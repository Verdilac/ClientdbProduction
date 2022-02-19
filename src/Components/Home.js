import React from "react";
<<<<<<< HEAD
=======
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormTag from "./FormTag";
import TableTag from "./TableTag";

>>>>>>> 144ef5c03e918ce97a29a7d99ac558d830b60798
import { useNavigate } from "react-router";
import { useUserAuth } from '../Util/UserAuthContext';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export default function Home() {

  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };




  return (
    <div>
      <h1>Welcome To Home</h1>
      <br></br>
      <h1>{user && user.email}
      </h1>

    
      <FormTag />
      <TableTag />


      <Button className="mt-3" onClick={handleLogout}>Logout</Button>


    </div>
  )
}
