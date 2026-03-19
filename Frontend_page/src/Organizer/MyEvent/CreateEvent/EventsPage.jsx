import React, { useEffect, useState } from "react";
import {
  Plus,
  User,
  Rocket,
  Calendar,
  Clock,
  Ticket,
  Users,
  MapPin,
  MoreVertical,
} from "lucide-react";

import CreateEvent from "./CreateEvent";
import { getEventshow } from "../../../Services/api";

/* 🔥 CONTINUOUS RIGHT → LEFT IMAGE SLIDER */
const ImageSlider = ({ images = [] }) => {

  const sliderImages =
    images.length === 1
      ? [...images, ...images, ...images]
      : [...images, ...images];

  return (
    <div className="w-28 h-20 overflow-hidden rounded-lg">
      <div className="flex animate-scroll">
        {sliderImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="event"
            className="w-28 h-20 object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

const EventsPage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEventshow();
      setEvents(data);
    } catch (err) {
      console.error(err);
    }
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [h, m] = time.split(":");
    const hour = h % 12 || 12;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour}:${m} ${ampm}`;
  };

  if (showCreate) {
    return <CreateEvent onBack={() => setShowCreate(false)} />;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      
      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">My Events</h1>

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Create Event
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((e) => (
          <div
            key={e.id}
            className="bg-white rounded-xl shadow hover:shadow-md transition"
          >
            
            {/* TOP SECTION */}
            <div className="flex justify-between items-center p-4">
              
              <div className="flex items-center gap-4">
                
                {/* 🔥 IMAGE SLIDER */}
                <ImageSlider
                  images={e.images || [e.banner_url]}
                />

                {/* TITLE */}
                <h2 className="text-lg font-semibold">
                  {e.event_name}
                </h2>
              </div>

              <MoreVertical className="text-gray-500 cursor-pointer" />
            </div>

            <hr />

            {/* DETAILS */}
            <div className="p-4 grid grid-cols-3 gap-4 text-sm">
              
              <div className="flex items-start gap-2">
                <User size={16} />
                <div>
                  <p className="text-gray-400">Created By</p>
                  <p className="font-medium">{e.created_by}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Rocket size={16} />
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className="font-medium">{e.status}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar size={16} />
                <div>
                  <p className="text-gray-400">Starts On</p>
                  <p className="font-medium">{e.start_date}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock size={16} />
                <div>
                  <p className="text-gray-400">Starting Time</p>
                  <p className="font-medium">
                    {formatTime(e.start_time)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Ticket size={16} />
                <div>
                  <p className="text-gray-400">Pass Fee</p>
                  <p className="font-medium">
                    {e.pass_fee || "Free"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Users size={16} />
                <div>
                  <p className="text-gray-400">Maximum Capacity</p>
                  <p className="font-medium">{e.capacity}</p>
                </div>
              </div>

            </div>

            {/* LOCATION */}
            <div className="px-4 pb-4 flex items-start gap-2 text-sm">
              <MapPin size={16} />
              <div>
                <p className="text-gray-400">Location</p>
                <p className="font-medium">
                  {e.venue}, {e.address}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;