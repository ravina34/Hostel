import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import API from "../../api/axios";

import toast from "react-hot-toast";

const Complaints = () => {
  const [complaints, setComplaints] =
    useState([]);

  // FETCH COMPLAINTS
  const fetchComplaints = async () => {
    try {
      const { data } = await API.get(
        "/complaints"
      );

      setComplaints(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // UPDATE STATUS
  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await API.put(
        `/complaints/${id}`,
        {
          status,
        }
      );

      toast.success("Status Updated");

      fetchComplaints();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-[250px] w-full p-10">

        <h1 className="text-3xl font-bold mb-8">
          Complaints
        </h1>

        <div className="bg-white rounded-xl shadow overflow-auto">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-3">
                  Student
                </th>

                <th className="p-3">
                  Title
                </th>

                <th className="p-3">
                  Priority
                </th>

                <th className="p-3">
                  Status
                </th>

                <th className="p-3">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {complaints.map((item) => (
                <tr
                  key={item._id}
                  className="text-center border-b"
                >

                  <td className="p-3">
                    {item.student?.name}
                  </td>

                  <td className="p-3">
                    {item.title}
                  </td>

                  <td className="p-3">

                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded">
                      {item.priority}
                    </span>

                  </td>

                  <td className="p-3">

                    {item.status ===
                    "Completed" ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
                        Completed
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded">
                        Pending
                      </span>
                    )}

                  </td>

                  <td className="p-3">

                    <button
                      onClick={() =>
                        updateStatus(
                          item._id,
                          "Completed"
                        )
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Complete
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

export default Complaints;