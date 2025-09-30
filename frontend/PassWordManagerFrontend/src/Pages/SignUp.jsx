import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", 
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      // Destructure to send only the required fields to the API
      const { name, email, password } = user;
      const res = await apiClient.post("/user/signup", { name, email, password });
      
      const data = res.data;
      if (data?.success) {
        toast.success(data.message);
        localStorage.setItem("token", data.data.refreshToken);
        localStorage.setItem("userId", data.data._id);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Sign-up failed. Please try again.";
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <form
        className="flex flex-col gap-3 border p-5 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center">Sign Up</h1>
        <label htmlFor="name">Name</label>
        <input
          className="p-2 outline-1 rounded-md"
          type="text"
          name="name"
          id="name"
          placeholder="Enter Username"
          onChange={handleChange}
          value={user.name}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          className="p-2 outline-1 rounded-md"
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          onChange={handleChange}
          value={user.email}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className="p-2 outline-1 rounded-md"
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          onChange={handleChange}
          value={user.password}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          className="p-2 outline-1 rounded-md"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={user.confirmPassword}
          required
        />
        <button
          className="p-1 rounded-lg outline-1 font-bold mx-auto w-30 disabled:bg-gray-400"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "SignUp"}
        </button>
        <div>
          <p className="text-center">
            Already a User?<br />
            <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignUp;