import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../api/axios"; 
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // For loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const res = await apiClient.post("/user/login", user);
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
      // Provide user-friendly error feedback
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <form
        className="flex flex-col gap-3 border p-5 rounded-md shadow-md"
        onSubmit={handleLogin}
      >
        <h1 className="text-center">Login Page</h1>
        <label htmlFor="email">Email</label>
        <input
          className="p-2 outline-1 rounded-md"
          type="email" // Use type="email" for better validation
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
        <button
          className="p-1 rounded-lg outline-1 font-bold mx-auto w-30 disabled:bg-gray-400"
          type="submit"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <div>
          <p className="text-center">
            Not a User?<br />
            <Link to="/signup">SignUp</Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;