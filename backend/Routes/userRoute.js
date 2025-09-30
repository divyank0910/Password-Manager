import { Router } from "express";
import { LoginUser, SignUpUser,Logout } from "../Controllers/userController.js";
import { AuthCheck } from "../Middleware/Auth.js";
let route=Router();
//login
route.post("/login",(LoginUser));
//signup
route.post("/signup",(SignUpUser));
//logout
route.get("/logout",(AuthCheck,Logout));
export default route;