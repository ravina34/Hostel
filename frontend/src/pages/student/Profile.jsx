import StudentSidebar from "../../components/StudentSidebar";

const Profile = () => {
  const student = JSON.parse(
    localStorage.getItem("student")
  );

  return (
    <div className="flex">

      <StudentSidebar />

      <div className="ml-[250px] w-full p-10">

        <h1 className="text-3xl font-bold mb-8">
          Student Profile
        </h1>

        <div className="bg-white p-8 rounded-xl shadow">

          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="font-bold">
                Name
              </label>

              <p className="mt-2 border p-3 rounded">
                {student?.name}
              </p>
            </div>

            <div>
              <label className="font-bold">
                Father Name
              </label>

              <p className="mt-2 border p-3 rounded">
                {student?.fatherName}
              </p>
            </div>

            <div>
              <label className="font-bold">
                Email
              </label>

              <p className="mt-2 border p-3 rounded">
                {student?.email}
              </p>
            </div>

            <div>
              <label className="font-bold">
                Branch
              </label>

              <p className="mt-2 border p-3 rounded">
                {student?.branch}
              </p>
            </div>

            <div>
              <label className="font-bold">
                Year
              </label>

              <p className="mt-2 border p-3 rounded">
                {student?.year}
              </p>
            </div>

            <div>
              <label className="font-bold">
                Room Number
              </label>

              <p className="mt-2 border p-3 rounded">
                {student?.roomNumber}
              </p>
            </div>

            <div>
              <label className="font-bold">
                Session
              </label>

              <p className="mt-2 border p-3 rounded">
                {student?.session}
              </p>
            </div>

            <div>
              <label className="font-bold">
                Address
              </label>

              <p className="mt-2 border p-3 rounded">
                {student?.address}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;