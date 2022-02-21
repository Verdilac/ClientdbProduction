import React from "react";
import { Button, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormTag from "./FormTag";
import TableTag from "./TableTag";
import Filter from "./Filter";
import { useNavigate } from "react-router";
import { useUserAuth } from '../Util/UserAuthContext';
import { Link } from "react-router-dom";


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


      <Link to="/form" className="btn btn-primary">Form</Link>




      {/* <FormTag /> */}
      <TableTag />


      <Button className="mt-3" onClick={handleLogout}>Logout</Button>


    </div>
  )
}
