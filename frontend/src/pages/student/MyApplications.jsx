import { useEffect, useState } from "react";

import StudentSidebar from "../../components/StudentSidebar";

import API from "../../api/axios";

const MyApplications = () => {
  const [applications, setApplications] =
    useState([]);

  // FETCH MY APPLICATIONS
  const fetchApplications =
    async () => {
      try {
        const { data } = await API.get(
          "/applications/my"
        );

        setApplications(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="flex">

      <StudentSidebar />

      <div className="ml-[250px] w-full p-10">

        <h1 className="text-3xl font-bold mb-8">
          My Leave Applications
        </h1>

        <div className="bg-white rounded-xl shadow overflow-auto">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-3">
                  Reason Type
                </th>

                <th className="p-3">
                  Reason
                </th>

                <th className="p-3">
                  From
                </th>

                <th className="p-3">
                  To
                </th>

                <th className="p-3">
                  Status
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
                    {item.reasonType}
                  </td>

                  <td className="p-3">
                    {item.reason}
                  </td>

                  <td className="p-3">
                    {item.fromDate?.slice(
                      0,
                      10
                    )}
                  </td>

                  <td className="p-3">
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

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default MyApplications;