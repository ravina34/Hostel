import { useState } from "react";

import toast from "react-hot-toast";

import API from "../../api/axios";

import StudentSidebar from "../../components/StudentSidebar";

const Complaint = () => {
  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      priority: "Low",
    });

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/complaints",
        formData
      );

      toast.success(
        "Complaint Submitted"
      );

      setFormData({
        title: "",
        description: "",
        priority: "Low",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">

      <StudentSidebar />

      <div className="ml-[250px] w-full p-10">

        <h1 className="text-3xl font-bold mb-8">
          Complaint Form
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow"
        >

          <input
            type="text"
            name="title"
            placeholder="Complaint Title"
            className="border p-3 rounded w-full mb-4"
            onChange={handleChange}
            value={formData.title}
          />

          <textarea
            name="description"
            placeholder="Complaint Description"
            className="border p-3 rounded w-full mb-4"
            rows="4"
            onChange={handleChange}
            value={formData.description}
          />

          <select
            name="priority"
            className="border p-3 rounded w-full mb-4"
            onChange={handleChange}
            value={formData.priority}
          >

            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>

          </select>

          <button
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            Submit Complaint
          </button>

        </form>

      </div>

    </div>
  );
};

export default Complaint;