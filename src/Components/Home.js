import React from "react";

import { useNavigate } from "react-router";
import { useUserAuth } from '../Util/UserAuthContext';

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

        <button onClick={handleLogout}></button>
    
    
    </div>
  )
}
