import { Link, useNavigate } from "react-router-dom";

const StudentSidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();

    navigate("/student-login");
  };

  return (
    <div className="w-[250px] min-h-screen bg-green-900 text-white p-5 fixed">

      <h1 className="text-2xl font-bold mb-10">
        Student Panel
      </h1>

      <div className="flex flex-col gap-4">

        <Link to="/student/dashboard">
          Dashboard
        </Link>

        <Link to="/student/apply-leave">
          Apply Leave
        </Link>
<Link to="/student/my-applications">
  My Applications
</Link>
        <Link to="/student/complaint">
          Complaint
        </Link>
        

        <Link to="/student/notifications">
          Notifications
        </Link>

        <Link to="/student/profile">
          Profile
        </Link>

        <Link to="/student/events">
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

export default StudentSidebar;