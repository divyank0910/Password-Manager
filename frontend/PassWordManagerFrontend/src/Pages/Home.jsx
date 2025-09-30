import { useEffect, useState } from "react";
import PasswordItem from "../Components/PasswordItem";
import { usePassContext } from "../Context/PassContext";

const Home = () => {
  const [newPassword, setNewPassword] = useState({ AccountType: "", password: "" });

  const { postPassword, allPassData, getPassword, LogOutUser } = usePassContext();

  useEffect(() => {
    getPassword();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postPassword(newPassword);
    setNewPassword({ AccountType: "", password: "" });
  };

  return (
    <section className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Passwords</h1>
        <button onClick={LogOutUser} className="p-2 bg-red-500 text-white rounded-md">
          Logout
        </button>
      </div>

      <div className="mb-8 p-5 border rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-3">Add a New Password</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="AccountType" className="block mb-1">Account Type</label>
            <input
              className="p-2 border rounded-md w-full"
              type="text"
              name="AccountType"
              id="AccountType"
              placeholder="Enter Account type. eg: Gmail,Youtube,Reddit"
              onChange={handleChange}
              value={newPassword.AccountType}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="p-2 border rounded-md w-full"
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              onChange={handleChange}
              value={newPassword.password}
              required
            />
          </div>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-md w-full md:w-auto">
            Add Password
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {allPassData && allPassData.length > 0 ? (
          allPassData.map((item) => (
            <PasswordItem key={item._id} value={item} />
          ))
        ) : (
          <p>No passwords saved yet.</p>
        )}
      </div>
    </section>
  );
};

export default Home;