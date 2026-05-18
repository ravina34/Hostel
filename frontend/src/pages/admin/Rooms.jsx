import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import API from "../../api/axios";

import toast from "react-hot-toast";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  const [formData, setFormData] =
    useState({
      roomNumber: "",
      totalBeds: "",
    });

  // FETCH ROOMS
  const fetchRooms = async () => {
    try {
      const { data } = await API.get(
        "/rooms"
      );

      setRooms(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // ADD ROOM
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/rooms",
        formData
      );

      toast.success("Room Added");

      fetchRooms();

      setFormData({
        roomNumber: "",
        totalBeds: "",
      });
    } catch (error) {
      toast.error(
        error.response.data.message
      );
    }
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-[250px] w-full p-10">

        <h1 className="text-3xl font-bold mb-8">
          Room Management
        </h1>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow mb-10 flex gap-4"
        >

          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            className="border p-3 rounded w-full"
            onChange={handleChange}
            value={formData.roomNumber}
          />

          <input
            type="number"
            name="totalBeds"
            placeholder="Total Beds"
            className="border p-3 rounded w-full"
            onChange={handleChange}
            value={formData.totalBeds}
          />

          <button
            className="bg-blue-600 text-white px-6 rounded"
          >
            Add Room
          </button>

        </form>

        {/* TABLE */}

        <div className="bg-white rounded-xl shadow overflow-auto">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-3">
                  Room Number
                </th>

                <th className="p-3">
                  Total Beds
                </th>

                <th className="p-3">
                  Occupied Beds
                </th>

                <th className="p-3">
                  Available Beds
                </th>

                <th className="p-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {rooms.map((room) => (
                <tr
                  key={room._id}
                  className="text-center border-b"
                >

                  <td className="p-3">
                    {room.roomNumber}
                  </td>

                  <td className="p-3">
                    {room.totalBeds}
                  </td>

                  <td className="p-3">
                    {room.occupiedBeds}
                  </td>

                  <td className="p-3">
                    {room.availableBeds}
                  </td>

                  <td className="p-3">

                    {room.isAvailable ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
                        Available
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded">
                        Full
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

export default Rooms;