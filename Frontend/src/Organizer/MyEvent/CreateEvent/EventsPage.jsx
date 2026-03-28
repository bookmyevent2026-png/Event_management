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
  LayoutGrid,
  Grid,
  LayoutList,
  List,
  Menu,
} from "lucide-react";
import { Eye } from "lucide-react";

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
  const [viewMode, setViewMode] = useState("medium"); // large, medium, small, compact, list, details
  const [showViewMenu, setShowViewMenu] = useState(false);

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
      <div className="flex justify-between items-center mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
          <p className="text-gray-500 mt-1">
            Manage and track your organized events
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* View Toggle Button */}
          <div className="relative">
            <button
              onClick={() => setShowViewMenu(!showViewMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl shadow-sm border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-300"
            >
              <Menu size={18} className="text-indigo-600" />
              <span className="text-sm font-semibold text-gray-700">View</span>
            </button>

            {showViewMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl z-20 overflow-hidden py-2 animate-fade-in">
                {[
                  { id: "large", name: "Extra large icons", icon: LayoutGrid },
                  { id: "medium", name: "Large icons", icon: Grid },
                  { id: "small", name: "Medium icons", icon: LayoutList },
                  { id: "compact", name: "Small icons", icon: List },
                  { id: "list", name: "List", icon: Menu }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setViewMode(mode.id);
                      setShowViewMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-indigo-50 transition ${
                      viewMode === mode.id
                        ? "text-indigo-600 bg-indigo-50 font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    <mode.icon size={16} />
                    <span className="text-sm">{mode.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Plus size={20} />
            Create Event
          </button>
        </div>
      </div>

      {/* GRID */}
      <div
        className={`grid gap-6 mb-8 transition-all duration-500 ${
          viewMode === "large"
            ? "grid-cols-1"
            : viewMode === "medium"
              ? "grid-cols-1 md:grid-cols-2"
              : viewMode === "small"
                ? "grid-cols-1 md:grid-cols-3"
                : viewMode === "compact"
                  ? "grid-cols-1 md:grid-cols-4"
                  : "grid-cols-1"
        }`}
      >
        {events.map((e, idx) => (
          <div
            key={e.id}
            className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-200 animate-fade-in ${
              viewMode === "list" || viewMode === "details"
                ? "flex flex-col md:flex-row items-center p-4 gap-6"
                : "flex flex-col"
            }`}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* TOP SECTION / IMAGE */}
            <div
              className={`relative flex justify-between items-start ${
                viewMode === "list" || viewMode === "details"
                  ? "w-full md:w-auto p-0"
                  : "p-6"
              }`}
            >
              <div
                className={`flex items-center gap-4 flex-1 ${
                  viewMode === "list" || viewMode === "details"
                    ? "flex-col md:flex-row text-center md:text-left"
                    : ""
                }`}
              >
                {/* 🔥 IMAGE SLIDER */}
                <div className="transform group-hover:scale-110 transition duration-500">
                  <ImageSlider images={e.images || [e.banner_url]} />
                </div>

                {/* TITLE */}
                <div className="flex-1 min-w-0">
                  <h2
                    className={`font-bold text-gray-900 group-hover:text-indigo-700 transition line-clamp-2 ${
                      viewMode === "large"
                        ? "text-2xl"
                        : viewMode === "compact"
                          ? "text-base"
                          : "text-xl"
                    }`}
                  >
                    {e.event_name}
                  </h2>
                </div>
              </div>

              {!(viewMode === "list" || viewMode === "details") && (
                <MoreVertical className="text-gray-400 cursor-pointer hover:text-indigo-600 transition p-1 rounded-lg hover:bg-gray-100" />
              )}
            </div>

            {!(viewMode === "list" || viewMode === "details") && <hr />}

            {/* DETAILS */}
            <div
              className={`relative grid gap-4 text-sm flex-1 ${
                viewMode === "list" || viewMode === "details"
                  ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-6 w-full p-0"
                  : viewMode === "compact"
                    ? "p-4 grid-cols-1"
                    : "p-6 grid-cols-2"
              }`}
            >
              <div className="group/item flex gap-3 items-center">
                <div className="p-1.5 bg-indigo-50 rounded-lg group-hover/item:bg-indigo-100 transition text-indigo-600">
                  <User size={14} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                    Created By
                  </p>
                  <p className="font-medium text-gray-900 truncate text-xs">
                    {e.created_by}
                  </p>
                </div>
              </div>

              <div className="group/item flex gap-3 items-center">
                <div className="p-1.5 bg-purple-50 rounded-lg group-hover/item:bg-purple-100 transition text-purple-600">
                  <Rocket size={14} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                    Status
                  </p>
                  <p
    className={`font-bold text-[10px] px-2 py-1 rounded-full inline-block
      ${
        e.status === "APPROVED"
          ? "bg-green-100 text-green-600"
          : e.status === "PENDING"
          ? "bg-yellow-100 text-yellow-600"
          : e.status === "REJECTED"
          ? "bg-red-100 text-red-600"
          : "bg-gray-100 text-gray-600"
      }
    `}
  >
    {e.status}
  </p>
                </div>
              </div>

              {viewMode !== "compact" && (
                <>
                  <div className="group/item flex gap-3 items-center">
                    <div className="p-1.5 bg-amber-50 rounded-lg group-hover/item:bg-amber-100 transition text-amber-600">
                      <Calendar size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                        Starts On
                      </p>
                      <p className="font-medium text-gray-900 text-xs">
                        {e.start_date}
                      </p>
                    </div>
                  </div>

                  <div className="group/item flex gap-3 items-center">
                    <div className="p-1.5 bg-blue-50 rounded-lg group-hover/item:bg-blue-100 transition text-blue-600">
                      <Clock size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                        Starting Time
                      </p>
                      <p className="font-medium text-gray-900 text-xs">
                        {formatTime(e.start_time)}
                      </p>
                    </div>
                  </div>

                  <div className="group/item flex gap-3 items-center">
                    <div className="p-1.5 bg-rose-50 rounded-lg group-hover/item:bg-rose-100 transition text-rose-600">
                      <Ticket size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                        Pass Fee
                      </p>
                      <p className="font-bold text-gray-900 text-xs">
                        {e.pass_fee || "Free"}
                      </p>
                    </div>
                  </div>

                  <div className="group/item flex gap-3 items-center">
                    <div className="p-1.5 bg-teal-50 rounded-lg group-hover/item:bg-teal-100 transition text-teal-600">
                      <Users size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                        Maximum Capacity
                      </p>
                      <p className="font-bold text-gray-900 text-xs">
                        {e.capacity}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* LOCATION */}
            {!(viewMode === "small" || viewMode === "compact") && (
              <div
                className={`relative flex gap-3 text-sm border-t border-gray-100 ${
                  viewMode === "list" || viewMode === "details"
                    ? "w-full md:w-64 p-0 border-t-0 border-l border-gray-100 pl-4 ml-4"
                    : "px-6 pb-6 pt-4"
                }`}
              >
                <MapPin size={18} className="text-indigo-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                    Location
                  </p>
                  <p className="font-medium text-gray-900 truncate text-xs">
                    {e.venue}, {e.address}
                  </p>
                </div>
              </div>
            )}

            {/* Actions for List View */}
            {(viewMode === "list" || viewMode === "details") && (
              <div className="flex items-center gap-2 ml-auto pr-4 border-l border-gray-100 pl-4 h-full">
                <button
                  className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition"
                  title="View Details"
                >
                  👁️
                </button>
                <button
                  className="p-2 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-scroll { animation: scroll 8s linear infinite; }
      `}</style>
    </div>
  );
};

export default EventsPage;
