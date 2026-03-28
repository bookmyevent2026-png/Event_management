import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import { getEventshow } from "../Services/api";
import ExhibitorNavbar from "./Navbar";
import { useSelector } from "react-redux";

const ExhibitorHome = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log("User from Redux:", user);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEventshow();

      const formatted = data.map((e) => ({
        id: e.id,
        title: e.event_name,
        location: `${e.venue}, ${e.address}`,
        date: e.start_date,
        image: e.banner_url || "https://via.placeholder.com/400",
      }));

      setEvents(formatted);
    } catch (err) {
      console.log("Error fetching events:", err);
    }
  };

  const handleBookStall = (event) => {
    navigate(`/book-stall/${event.id}`, { state: { event } });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <h1 className=" mb-6 text-center">
        <ExhibitorNavbar /> Welcome, {user.name} 👋 <p>User ID: {user.id}</p>
      </h1>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <p className="text-center col-span-full text-slate-400">
            No events available
          </p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
            >
              {/* Image */}
              <img
                src={event.image}
                alt={event.title}
                className="h-48 w-full object-cover"
              />

              {/* Content */}
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-bold">{event.title}</h2>

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin size={14} />
                  {event.location}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Calendar size={14} />
                  {new Date(event.date).toDateString()}
                </div>

                {/* Button */}
                <button
                  onClick={() => handleBookStall(event)}
                  className="w-full mt-3 bg-orange-500 hover:bg-orange-600 py-2 rounded font-semibold"
                >
                  Book Stall
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExhibitorHome;