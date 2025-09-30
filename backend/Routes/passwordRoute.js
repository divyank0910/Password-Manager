import { Router } from "express";
import { getPassword,setPassword,updatePassword,deletePassword } from "../Controllers/passwordController.js";
import { AuthCheck } from "../Middleware/Auth.js";
let route=Router();
//get pass
route.get("/getpassword",AuthCheck,getPassword);
//set pass
route.post("/setpassword",AuthCheck,setPassword);
//update pass
route.put("/updatepassword/:id",AuthCheck,updatePassword);
//delete pass
route.delete("/deletepassword/:id",AuthCheck,deletePassword);
export default route;