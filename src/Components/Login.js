
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from '../Util/UserAuthContext';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
          await logIn(email, password);
          navigate("/home");
        } catch (err) {
          setError(err.message);
        }
      };


  return (
    <div>
    

        <input type={"text"} placeholder="Username"  onChange={(e)=> setEmail(e.target.value)} ></input>
        <input type={"password"} placeholder="Password" onChange={(e)=> setPassword(e.target.value)} ></input>

        <button onClick={handleSubmit} >Login </button>



    </div>
  )
}
