import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:
    {
    type:String,
    unique:true,

    },
    email:
    {
    type:String,
    required:true,
    },
    password:
    {
    type:String,
    required:true,
    },
    refreshToken:
    {
        type:String,
        default:null
    }
},{timestamps:true});
export default mongoose.model("Users",userSchema);