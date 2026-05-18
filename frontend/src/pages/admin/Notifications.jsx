import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import API from "../../api/axios";

import toast from "react-hot-toast";

const Notifications = () => {
  const [notifications, setNotifications] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      message: "",
    });

  // FETCH
  const fetchNotifications =
    async () => {
      try {
        const { data } = await API.get(
          "/notifications"
        );

        setNotifications(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/notifications",
        formData
      );

      toast.success(
        "Notification Sent"
      );

      fetchNotifications();

      setFormData({
        title: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const deleteNotification =
    async (id) => {
      try {
        await API.delete(
          `/notifications/${id}`
        );

        toast.success(
          "Notification Deleted"
        );

        fetchNotifications();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-[250px] w-full p-10">

        <h1 className="text-3xl font-bold mb-8">
          Notifications
        </h1>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow mb-10"
        >

          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border p-3 rounded w-full mb-4"
            onChange={handleChange}
            value={formData.title}
          />

          <textarea
            name="message"
            placeholder="Message"
            className="border p-3 rounded w-full mb-4"
            rows="4"
            onChange={handleChange}
            value={formData.message}
          />

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Send Notification
          </button>

        </form>

        {/* LIST */}

        <div className="grid gap-5">

          {notifications.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    {item.message}
                  </p>

                </div>

                <button
                  onClick={() =>
                    deleteNotification(
                      item._id
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded h-fit"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Notifications;