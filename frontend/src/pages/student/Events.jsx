import {
  useEffect,
  useState,
} from "react";

import StudentSidebar from "../../components/StudentSidebar";

import API from "../../api/axios";

const Events = () => {
  const [events, setEvents] =
    useState([]);

  const fetchEvents = async () => {
    const { data } = await API.get(
      "/events"
       );

    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="flex">

      <StudentSidebar />

      <div className="ml-[250px] w-full p-10">

        <h1 className="text-3xl font-bold mb-8">
          Hostel Events
           </h1>

        <div className="grid grid-cols-3 gap-6">

          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >

              <img
                src={`http://localhost:5000/uploads/${event.image}`}
                alt="event"
                className="h-56 w-full object-cover"
              />

              <div className="p-4">

                <h2 className="text-xl font-bold">
                  {event.title}
                </h2>
                <p className="mt-2 text-gray-600">
                  {event.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Events;