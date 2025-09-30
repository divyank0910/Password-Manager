import PasswordModal from "../Modals/passwordSchema.js";

export const getPassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const allPass = await PasswordModal.find({ AuthorId: userId });
    return res.status(200).send({
      success: true,
      data: allPass,
      message: "Passwords fetched successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ success: false, message: "Server Error" });
  }
};

export const setPassword = async (req, res) => {
  try {
    const { AccountType, password } = req.body;
    if (!AccountType || !password) {
      return res.status(400).send({ success: false, message: "All fields are required" });
    }

    const newPassword = new PasswordModal({
      AccountType,
      password,
      AuthorId: req.user._id,
    });
    await newPassword.save();
    
    return res.status(201).send({
      success: true,
      data: newPassword,
      message: "Password saved successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ success: false, message: "Server Error" });
  }
};



export const updatePassword = async (req, res) => {
  try {
    const passId = req.params.id;
    const userId = req.user._id;
    const updateData = req.body; 

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).send({ success: false, message: "No update data provided." });
    }

    const updatedPass = await PasswordModal.findOneAndUpdate(
      { _id: passId, AuthorId: userId }, 
      { $set: updateData },             
      { new: true, runValidators: true }  
    );

    
    if (!updatedPass) {
      return res.status(404).send({ success: false, message: "Password not found or you don't have permission to edit it." });
    }

    return res.status(200).send({
      success: true,
      data: updatedPass,
      message: "Password updated successfully",
    });
  } catch (err) {
    
    console.error("UPDATE_PASSWORD_ERROR:", err);
    return res.status(500).send({ success: false, message: "Failed to update password" });
  }
};

export const deletePassword = async (req, res) => {
  try {
    const passId = req.params.id;
    const userId = req.user._id;
    
    const deletedPass = await PasswordModal.findOneAndDelete({ _id: passId, AuthorId: userId });

    if (!deletedPass) {
      return res.status(404).send({ success: false, message: "Password not found or access denied" });
    }

    return res.status(200).send({
      success: true,
      message: "Password deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ success: false, message: "Server Error" });
  }
};