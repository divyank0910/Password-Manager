import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios.js"; 
import toast from "react-hot-toast";

const PassContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePassContext = () => useContext(PassContext);

export const PassContextProvider = ({ children }) => {
  const [passData, setPassData] = useState({ AccountType: "", password: "" });
  const [allPassData, setAllPassData] = useState([]);
  const navigate = useNavigate();

  const postPassword = async (Data) => {
    try {
      const res = await apiClient.post("/password/setPassword", Data);
      const postData = res?.data;
      if (postData?.success) {
        setAllPassData((prev) => [...prev,postData.data]);
        toast.success(postData?.message);
      } else {
        toast.error(postData?.message);
      }
    } catch (err) {
      toast.error("Failed to save password.");
      console.log(err);
    }
  };

  const getPassword = async () => {
    try {
      const res = await apiClient.get("/password/getPassword");
      const getData = res?.data;
      if (getData?.success) {
        setAllPassData(getData?.data);
      } else {
        toast.error(getData?.message);
      }
    } catch (err) {
      toast.error("Failed to fetch passwords.");
      console.log(err);
    }
  };

  const deletePassword = async (passId) => {
    try {
      const res = await apiClient.delete(`/password/deletePassword/${passId}`);
      const deleteData = res?.data;
      if (deleteData?.success) {
        const newPassData = allPassData.filter((item) => item?._id !== passId);
        setAllPassData(newPassData);
        toast.success(deleteData?.message);
      } else {
        toast.error(deleteData?.message);
      }
    } catch (err) {
      toast.error("Failed to delete password.");
      console.log(err);
    }
  };

  const updatePassword = async (passId, newPassData) => {
    try {
      const res = await apiClient.put(`/password/updatePassword/${passId}`, newPassData);

      if (res.data?.success) {
        setAllPassData((prev) =>
          prev.map((item) =>
            item._id === passId._id ? res?.data : item
          )
        );
        toast.success(res.data?.message);
      } else {
        toast.error(res.data?.message);
      }
    } catch (err) {
      toast.error("Failed to update password.");
      console.log(err);
    }
  };

  const LogOutUser = async () => {
    localStorage.clear();
    toast.success("You have been logged out.");
    navigate("/login");
  };
  
  return (
    <PassContext.Provider
      value={{
        postPassword,
        passData,
        setPassData,
        allPassData,
        getPassword,
        deletePassword,
        updatePassword,
        LogOutUser,
      }}
    >
      {children}
    </PassContext.Provider>
  );
};