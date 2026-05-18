import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import API from "../../api/axios";

import toast from "react-hot-toast";

const Students = () => {
  const [students, setStudents] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [rooms, setRooms] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      fatherName: "",
      email: "",
      password: "",
      address: "",
      session: "",
      branch: "",
      year: "",
      roomNumber: "",
    });

  // FETCH STUDENTS
  const fetchStudents = async () => {
    try {
      const { data } = await API.get(
        "/students"
      );

      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH AVAILABLE ROOMS
  const fetchRooms = async () => {
    try {
      const { data } = await API.get(
        "/rooms/available"
      );

      setRooms(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();

    fetchRooms();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // ADD STUDENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/students",
        formData
      );

      toast.success("Student Added");

      fetchStudents();

      fetchRooms();

      setFormData({
        name: "",
        fatherName: "",
        email: "",
        password: "",
        address: "",
        session: "",
        branch: "",
        year: "",
        roomNumber: "",
      });
    } catch (error) {
      toast.error(
        error.response.data.message
      );
    }
  };

  // DELETE STUDENT
  const deleteStudent = async (id) => {
    try {
      await API.delete(
        `/students/${id}`
      );

      toast.success(
        "Student Deleted"
      );

      fetchStudents();

      fetchRooms();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-[250px] w-full p-10">

        <h1 className="text-3xl font-bold mb-8">
          Student Management
        </h1>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow mb-10 grid grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Student Name"
            className="border p-3 rounded"
            onChange={handleChange}
            value={formData.name}
          />

          <input
            type="text"
            name="fatherName"
            placeholder="Father Name"
            className="border p-3 rounded"
            onChange={handleChange}
            value={formData.fatherName}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-3 rounded"
            onChange={handleChange}
            value={formData.email}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-3 rounded"
            onChange={handleChange}
            value={formData.password}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border p-3 rounded"
            onChange={handleChange}
            value={formData.address}
          />

          <input
            type="text"
            name="session"
            placeholder="Session"
            className="border p-3 rounded"
            onChange={handleChange}
            value={formData.session}
          />

          <input
            type="text"
            name="branch"
            placeholder="Branch"
            className="border p-3 rounded"
            onChange={handleChange}
            value={formData.branch}
          />

          <select
            name="year"
            className="border p-3 rounded"
            onChange={handleChange}
            value={formData.year}
          >

            <option value="">
              Select Year
            </option>

            <option value="1st">
              1st Year
            </option>

            <option value="2nd">
              2nd Year
            </option>

            <option value="3rd">
              3rd Year
            </option>

            <option value="4th">
              4th Year
            </option>

          </select>

          {/* AVAILABLE ROOMS */}

          <select
            name="roomNumber"
            className="border p-3 rounded"
            onChange={handleChange}
            value={formData.roomNumber}
          >

            <option value="">
              Select Room
            </option>

            {rooms.map((room) => (
              <option
                key={room._id}
                value={room.roomNumber}
              >
                {room.roomNumber}
                {" "}(
                {room.availableBeds}
                {" "}Beds Left)
              </option>
            ))}

          </select>

          <button
            className="bg-blue-600 text-white rounded p-3"
          >
            Add Student
          </button>

        </form>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search Student"
          className="border p-3 rounded mb-5 w-full"
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* TABLE */}

        <div className="bg-white rounded-xl shadow overflow-auto">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-3">
                  Name
                </th>

                <th className="p-3">
                  Email
                </th>

                <th className="p-3">
                  Branch
                </th>

                <th className="p-3">
                  Year
                </th>

                <th className="p-3">
                  Room
                </th>

                <th className="p-3">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {students
                .filter((student) =>
                  student.name
                    .toLowerCase()
                    .includes(
                      search.toLowerCase()
                    )
                )
                .map((student) => (
                  <tr
                    key={student._id}
                    className="text-center border-b"
                  >

                    <td className="p-3">
                      {student.name}
                    </td>

                    <td className="p-3">
                      {student.email}
                    </td>

                    <td className="p-3">
                      {student.branch}
                    </td>

                    <td className="p-3">
                      {student.year}
                    </td>

                    <td className="p-3">
                      {student.roomNumber}
                    </td>

                    <td className="p-3">

                      <button
                        onClick={() =>
                          deleteStudent(
                            student._id
                          )
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>

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

export default Students;