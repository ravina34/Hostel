import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import API from "../../api/axios";

import toast from "react-hot-toast";

const Applications = () => {
  const [applications, setApplications] =
    useState([]);

  // FETCH APPLICATIONS
  const fetchApplications =
    async () => {
      try {
        const { data } = await API.get(
          "/applications"
        );

        setApplications(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchApplications();
  }, []);

  // UPDATE STATUS
  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await API.put(
        `/applications/${id}`,
        {
          status,
        }
      );

      toast.success(
        `Application ${status}`
      );

      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-[250px] w-full p-10">

        <h1 className="text-3xl font-bold mb-8">
          Leave Applications
        </h1>

        <div className="bg-white rounded-xl shadow overflow-auto">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-3">
                  Student
                </th>

                <th className="p-3">
                  Branch
                </th>

                <th className="p-3">
                  Reason
                </th>

                <th className="p-3">
                  Dates
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

              {applications.map((item) => (
                <tr
                  key={item._id}
                  className="text-center border-b"
                >

                  <td className="p-3">
                    {item.student?.name}
                  </td>

                  <td className="p-3">
                    {item.student?.branch}
                  </td>

                  <td className="p-3">
                    {item.reason}
                  </td>

                  <td className="p-3">
                    {item.fromDate?.slice(
                      0,
                      10
                    )}
                    {" "}to{" "}
                    {item.toDate?.slice(
                      0,
                      10
                    )}
                  </td>

                  <td className="p-3">

                    {item.status ===
                    "Approved" ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
                        Approved
                      </span>
                    ) : item.status ===
                      "Rejected" ? (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded">
                        Rejected
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded">
                        Pending
                      </span>
                    )}

                  </td>

                  <td className="p-3 flex gap-2 justify-center">

                    <button
                      onClick={() =>
                        updateStatus(
                          item._id,
                          "Approved"
                        )
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          item._id,
                          "Rejected"
                        )
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Reject
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

export default Applications;