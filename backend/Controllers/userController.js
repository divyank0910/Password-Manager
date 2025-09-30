import bcryptjs from "bcryptjs";
import UserModal from "../Modals/userSchema.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET=process.env.JWT_SECRET;
export const LoginUser = async(req, res) => {
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.send({success:false,message:"Fill all Fields"});
        }
        //check user
        const userExists=await UserModal.findOne({ email });
        if (!userExists) {
        res.send({ success: false, message: "User doesn't exist" });
        }
        //match password
        const comparePass=await bcryptjs.compare(password,userExists.password);
        if(!comparePass){
             res.send({ success: false, message: "Password Incorrect" });
        }
        const token=jwt.sign({_id:userExists?._id},JWT_SECRET);
        if (!token){
            return res.send({ success: false, message: "invalid token" });
        }
        userExists.refreshToken=token;
        userExists.save({ validateBeforeSave: true });
        return res.send({
      success: true,
      data:{
        _id: userExists._id,
        name: userExists.name,
        email:userExists.email,
        refreshToken:token
      },
      message: "user logged in successfully",
        });
    }
    catch(error){
        
    console.log(error);
    return res.send({success:false,message:error.message});
    }
};
export const SignUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.send({ success: false, message: "Fill all Fields" });
    }
    //check user existance
    const userExists = await UserModal.findOne({ email });
    if (userExists) {
      res.send({ success: false, message: "User already exists" });
    }
    //hash password
    const hashPass = await bcryptjs.hash(password, 10); //10 here is salt
    //save user
    const newUser = new UserModal({ name, email, password: hashPass });
    await newUser.save();
    //generate token
    const token = await jwt.sign({ _id: newUser?._id }, JWT_SECRET);
    if (!token) {
      return res.send({ success: false, message: "invalid token" });
    }
    newUser.refreshToken = token;
    newUser.save({ validateBeforeSave: true });
    return res.send({
      success: true,
      data:{
        _id:newUser._id,
        name: newUser.name,
        email:newUser.email,
        refreshToken:token
      },
      message: "user created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.send({success:false,message:error.message});
  }
};
export const Logout = async (req, res) => {
  const userid = req.user?._id;
  try {
    await userModal.findByIdAndUpdate(
      {_id: userid },
      {
        $set: {
          refreshtoken: null,
        },
      }
    );

    return res.send({
      success: true,

      message: "user Logout successfully ",
    });
  } catch (error) {
    console.log(error);

    return res.send({ success: false, message: error.message });
  }
};
