import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <div className="w-[250px] min-h-screen bg-blue-900 text-white p-5 fixed">

      <h1 className="text-2xl font-bold mb-10">
        Hostel Admin
      </h1>

      <div className="flex flex-col gap-4">

        <Link to="/admin/dashboard">
          Dashboard
        </Link>

        <Link to="/admin/students">
          Students
        </Link>

        <Link to="/admin/rooms">
          Rooms
        </Link>

        <Link to="/admin/attendance">
          Attendance
        </Link>

        <Link to="/admin/complaints">
          Complaints
        </Link>

        <Link to="/admin/notifications">
          Notifications
        </Link>

        <Link to="/admin/applications">
          Applications
        </Link>

        <Link to="/admin/events">
          Events
        </Link>

        <button
          onClick={logoutHandler}
          className="bg-red-500 mt-10 py-2 rounded"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Sidebar;