import React, {useState} from 'react';
import Navbar from "../Navbar";
import {useNavigate} from "react-router-dom";

const Login = () => {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  //login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //catching the data send from the backend
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.errors) {
        setErrors(data.errors);
      } else if (!data.errors) {
        console.log("After login get data", data);
        //login was sucess now lets localStoarage
        // Save user details to local storage and set the user state
        // localStorage.setItem("userData", JSON.stringify(data));

        // //get the chatlist and setItem
        // try {
        //   const config = {
        //     headers: {
        //       authorization: `Bearer ${data.tokens[0].token}`, //throws a token
        //     },
        //   };
        //   const response = await axios.get("/chat/api", config);
        //
        //   localStorage.setItem("usertoken", data.tokens[0].token);
        //
        //   setchatList(response.data);
        //
        //   localStorage.setItem("UserChatList", JSON.stringify(response.data));
        //
        //   //if new register Display something new page
        //
        //   if (response.data) {
        //     setSocketConnected(true);
        //
        //     //when us connectes enteres to all room which is being cretaed
        //     response.data.forEach((chat) => {
        //       const room = chat._id;
        //       socket.emit("join_room", room);
        //     });
        //   }
        // } catch (e) {
        //   console.log("failed to get a chatList");
        // }
        //
        // setUser(data); //set the user

        navigate("/auth");
      }
    } catch (error) {
      console.log("Error in react", error);
    }
  };

  return (
    <>
    <div className="login-page">
      <Navbar/>
      <div className="login-form">
        <div className="login-head">
          <h1>Login Form</h1>
        </div>
        <div className="login-form-body">
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-96 p-6 bg-white rounded shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-green-500">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input type="email" id="email"
                         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                         placeholder="Enter your email"
                         name="email"
                         value={formData.email}
                         onChange={handleChange}/>
                  <p className="danger text-red-500 text-xs mt-1">{errors.email}</p>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                  <input type="password" id="password"
                         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                         placeholder="Enter your password"
                         name="password"
                         value={formData.password}
                         onChange={handleChange}/>
                  <p className="danger text-red-500 text-xs mt-1">{errors.password}</p>
                </div>
                <button type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
