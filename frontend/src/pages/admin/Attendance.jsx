import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import API from "../../api/axios";

import toast from "react-hot-toast";

const Attendance = () => {
  const [students, setStudents] =
    useState([]);

  const [attendance, setAttendance] =
    useState([]);

  const [filterDate, setFilterDate] =
    useState("");

  const [formData, setFormData] =
    useState({
      student: "",
      status: "Present",
    });

  // FETCH STUDENTS
  const fetchStudents = async () => {
    const { data } = await API.get(
      "/students"
    );

    setStudents(data);
  };

  // FETCH ATTENDANCE
  const fetchAttendance = async () => {
    const { data } = await API.get(
      "/attendance"
    );

    setAttendance(data);
  };

  useEffect(() => {
    fetchStudents();

    fetchAttendance();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // MARK ATTENDANCE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/attendance",
        formData
      );

      toast.success(
        "Attendance Marked"
      );

      fetchAttendance();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-[250px] w-full p-10">

        <h1 className="text-3xl font-bold mb-8">
          Attendance
        </h1>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow mb-10 flex gap-4"
        >

          <select
            name="student"
            className="border p-3 rounded w-full"
            onChange={handleChange}
          >

            <option value="">
              Select Student
            </option>

            {students.map((student) => (
              <option
                key={student._id}
                value={student._id}
              >
                {student.name}
              </option>
            ))}

          </select>

          <select
            name="status"
            className="border p-3 rounded"
            onChange={handleChange}
          >

            <option value="Present">
              Present
            </option>

            <option value="Absent">
              Absent
            </option>

          </select>

          <button
            className="bg-blue-600 text-white px-6 rounded"
          >
            Submit
          </button>

        </form>

        {/* FILTER DATE */}

        <div className="mb-5">

          <input
            type="date"
            className="border p-3 rounded"
            onChange={(e) =>
              setFilterDate(
                e.target.value
              )
            }
          />

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-xl shadow overflow-auto">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-3">
                  Student
                </th>

                <th className="p-3">
                  Email
                </th>

                <th className="p-3">
                  Date
                </th>

                <th className="p-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {attendance
                .filter((item) => {

                  if (!filterDate)
                    return true;

                  return (
                    new Date(
                      item.date
                    )
                      .toISOString()
                      .slice(0, 10) ===
                    filterDate
                  );
                })
                .map((item) => (
                  <tr
                    key={item._id}
                    className="text-center border-b"
                  >

                    <td className="p-3">
                      {item.student?.name}
                    </td>

                    <td className="p-3">
                      {item.student?.email}
                    </td>

                    <td className="p-3">
                      {new Date(
                        item.date
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-3">

                      {item.status ===
                      "Present" ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
                          Present
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded">
                          Absent
                        </span>
                      )}

                    </td>

                  </tr>
                ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Attendance;