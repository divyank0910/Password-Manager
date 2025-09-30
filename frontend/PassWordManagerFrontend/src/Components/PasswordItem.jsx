import { useState} from "react";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import moment from "moment";
import { usePassContext } from "../Context/PassContext";

const PasswordItem = ({ value }) => {
  const { deletePassword, updatePassword } = usePassContext();

  const [isEditing, setIsEditing] = useState(false);
  const [visible, setVisible] = useState(false);
  
  const [editData, setEditData] = useState({ password: "" });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this password?")) {
      deletePassword(value._id);
    }
  };

  const handleUpdate = () => {
    if (!editData.password) {
      alert("Please enter a new password.");
      return;
    }
    updatePassword(value._id, editData);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ password: "" }); 
  };

  return (
    <div className="flex flex-col gap-3 border p-5 rounded-md shadow-md">
      <input
        type="text"
        name="AccountType"
        className="p-2 border rounded-md disabled:bg-gray-100 font-semibold"
        value={value.AccountType}
        readOnly
      />

      {isEditing ? (
        <input
          type="password"
          name="password"
          className="p-2 border rounded-md"
          placeholder="Enter New Password"
          value={editData.password}
          onChange={(e) => setEditData({ password: e.target.value })}
          autoFocus
        />
      ) : (
        <div className="w-full relative">
          <input
            type={visible ? "text" : "password"}
            className="p-2 border rounded-md w-full disabled:bg-gray-100"
            value={value.password}
            readOnly
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute top-1/2 right-2 -translate-y-1/2"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <VisibilityOff fontSize="small" /> : <RemoveRedEye fontSize="small" />}
          </button>
        </div>
      )}

      {isEditing ? (
        <div className="flex items-center justify-end gap-2">
          <button onClick={handleCancel} className="p-1 border rounded-md">
            Cancel
          </button>
          <button onClick={handleUpdate} className="p-1 border rounded-md bg-blue-500 text-white">
            Update
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-1">
          <p className="text-sm text-gray-500 truncate">
            Updated: {moment(value.updatedAt).fromNow()}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-green-500"
              aria-label="Edit password"
            >
              <ModeIcon />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500"
              aria-label="Delete password entry"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordItem;