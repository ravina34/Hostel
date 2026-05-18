import { useEffect, useState } from "react";

import StudentSidebar from "../../components/StudentSidebar";

import API from "../../api/axios";

const StudentNotifications = () => {
  const [notifications, setNotifications] =
    useState([]);

  // FETCH NOTIFICATIONS
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

  return (
    <div className="flex">

      <StudentSidebar />

      <div className="ml-[250px] w-full p-10">

        <h1 className="text-3xl font-bold mb-8">
          Notifications
        </h1>

        <div className="grid gap-5">

          {notifications.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <h2 className="text-xl font-bold">
                {item.title}
              </h2>

              <p className="mt-2 text-gray-600">
                {item.message}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default StudentNotifications;