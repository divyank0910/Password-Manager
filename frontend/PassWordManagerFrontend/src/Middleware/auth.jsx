import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Auth=()=>{
    const navigate=useNavigate();
    const token=localStorage.getItem("token");
    useEffect(()=>{
        if(!token){
            //redirect to login
            navigate("/login");
        }
    },[navigate,token]);
    return(
        //to access child in parent
        <>
        <Outlet/>
        </>
    )
}
export default Auth;