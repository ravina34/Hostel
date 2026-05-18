import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import API from "../../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    rooms: 0,
    complaints: 0,
    applications: 0,
  });

  // FETCH STATS
  const fetchStats = async () => {
    try {
      const { data } = await API.get(
        "/dashboard"
      );

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-[250px] p-10 w-full">

        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-4 gap-5 mt-10">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold">
              Total Students
            </h2>

            <p className="text-3xl mt-4">
              {stats.students}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold">
              Total Rooms
            </h2>

            <p className="text-3xl mt-4">
              {stats.rooms}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold">
              Complaints
            </h2>

            <p className="text-3xl mt-4">
              {stats.complaints}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold">
              Leave Applications
            </h2>

            <p className="text-3xl mt-4">
              {stats.applications}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;