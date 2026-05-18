import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../../components/Sidebar";

import API from "../../api/axios";

import toast from "react-hot-toast";

const Events = () => {
  const [events, setEvents] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      image: null,
       });

  // FETCH EVENTS
  const fetchEvents = async () => {
    const { data } = await API.get(
      "/events"
    );

    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // HANDLE IMAGE
  const handleImage = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "description",
        formData.description
      );
       data.append(
        "image",
        formData.image
      );

      await API.post(
        "/events",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Event Added"
      );
       fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-[250px] w-full p-10">

        <h1 className="text-3xl font-bold mb-8">
          Events
        </h1>
 {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow mb-10 flex flex-col gap-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Event Title"
            className="border p-3 rounded"
            onChange={handleChange}
          />
            <textarea
            name="description"
            placeholder="Description"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <input
            type="file"
            onChange={handleImage}
          />

          <button
            className="bg-blue-600 text-white p-3 rounded"
          >
            Upload Event
          </button>
          </form>

        {/* EVENTS */}

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