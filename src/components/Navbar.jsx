import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";

function Navbar(params) {

    const { user, setUser, updateToken } = useContext(AuthContext);
  console.log("user in navbar" , user);
  
    return(
        <div>
            <h1>{user?.fullName}</h1>
        </div>
    )
}

export default Navbar