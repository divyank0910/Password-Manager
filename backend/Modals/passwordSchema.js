import mongoose from "mongoose";
const passwordSchema=new mongoose.Schema({
    AuthorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users",
    },
    AccountType:{
    type:String,
    required:true,
    },
    password:
    {
    type:String,
    required:true,
    },
},{timestamps:true});
export default mongoose.model("password",passwordSchema);