import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../api/axios";

const StudentLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post(
        "/auth/student-login",
        formData
      );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "role",
        "student"
      );

      localStorage.setItem(
        "student",
        JSON.stringify(data.student)
      );

      toast.success("Login Successful");

      navigate("/student/dashboard");
    } catch (error) {
      toast.error(
        error.response.data.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-[400px]"
      >

        <h2 className="text-3xl font-bold text-center mb-6">
          Student Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 text-white w-full py-3 rounded"
        >
          {loading
            ? "Loading..."
            : "Login"}
        </button>

      </form>

    </div>
  );
};

export default StudentLogin;