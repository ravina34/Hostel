import { useState } from "react";

import toast from "react-hot-toast";

import API from "../../api/axios";

import StudentSidebar from "../../components/StudentSidebar";

const ApplyLeave = () => {
  const [formData, setFormData] =
    useState({
      reasonType: "",
      reason: "",
      fromDate: "",
      toDate: "",
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
        "/applications",
        formData
      );

      toast.success(
        "Leave Applied"
      );

      setFormData({
        reasonType: "",
        reason: "",
        fromDate: "",
        toDate: "",
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
          Apply Leave
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow"
        >

          <select
            name="reasonType"
            className="border p-3 rounded w-full mb-4"
            onChange={handleChange}
            value={formData.reasonType}
          >

            <option value="">
              Select Reason Type
            </option>

            <option value="Home">
              Home
            </option>

            <option value="Outside">
              Outside
            </option>

            <option value="Other">
              Other
            </option>

          </select>

          <textarea
            name="reason"
            placeholder="Reason"
            className="border p-3 rounded w-full mb-4"
            rows="4"
            onChange={handleChange}
            value={formData.reason}
          />

          <input
            type="date"
            name="fromDate"
            className="border p-3 rounded w-full mb-4"
            onChange={handleChange}
            value={formData.fromDate}
          />

          <input
            type="date"
            name="toDate"
            className="border p-3 rounded w-full mb-4"
            onChange={handleChange}
            value={formData.toDate}
          />

          <button
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            Apply
          </button>

        </form>

      </div>

    </div>
  );
};

export default ApplyLeave;