import React, { useState } from "react";
import Navbar from "../Navbar";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    lastname: "Shrestha",
    email: "",
    address: "BKT",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!data.errors) {
        alert("SuccessFully Registered");
      } else if (data.errors) {
        setErrors(data.errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="register-page">
        <Navbar />
        <div className="register-form">
          <div className="register-head">
            <h1>Register Form</h1>
          </div>
          <div className="register-form-body">
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <div className="w-96 p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-green-500">
                  Register
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      placeholder="Enter your fullname"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                    />
                    <p className="danger text-red-500 text-xs mt-1">
                      {errors.full_name}
                    </p>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <p className="danger text-red-500 text-xs mt-1">
                      {errors.email}
                    </p>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      placeholder="Enter your password"
                      onChange={handleChange}
                    />
                    <p className="danger text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      placeholder="Confirm your password"
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                    />
                    <p className="danger text-red-500 text-xs mt-1">
                      {errors.password_confirmation}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Register
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

export default Register;
