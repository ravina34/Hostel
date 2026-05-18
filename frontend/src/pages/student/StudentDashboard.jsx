import StudentSidebar from "../../components/StudentSidebar";

const StudentDashboard = () => {
  const student = JSON.parse(
    localStorage.getItem("student")
  );

  return (
    <div className="flex">

      <StudentSidebar />

      <div className="ml-[250px] p-10 w-full">

        <h1 className="text-4xl font-bold">
          Welcome {student?.name}
        </h1>

        <div className="grid grid-cols-3 gap-5 mt-10">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold">
              Branch
            </h2>

            <p className="mt-3">
              {student?.branch}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold">
              Year
            </h2>

            <p className="mt-3">
              {student?.year}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold">
              Room Number
            </h2>

            <p className="mt-3">
              {student?.roomNumber}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;