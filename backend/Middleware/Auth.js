import jwt from "jsonwebtoken";
import UserModal from "../Modals/userSchema.js";

export const AuthCheck = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).send({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    //  Find the user from the database to ensure they still exist
    req.user = await UserModal.findById(decodedPayload._id).select("-password");
    
    if (!req.user) {
        return res.status(404).send({ success: false, message: "User not found." });
    }
    next(); 
  } catch (err) {
    res.status(400).send({ success: false, message: "Invalid token." });
  }
};