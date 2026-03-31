import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CalendarDays, Store } from "lucide-react";

const ExhibitorNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItem = (path) =>
    `px-4 py-2 rounded-lg cursor-pointer ${
      location.pathname === path
        ? "bg-purple-600 text-white"
        : "text-gray-300 hover:bg-slate-800"
    }`;

  return (
    <div className="w-full bg-slate-950 border-b border-slate-800 px-6 py-3 flex justify-between items-center">

      <h1 className="text-xl font-bold">Exhibitor Panel</h1>

      <div className="flex gap-4">
        <div
          className={navItem("/exhibitor/home")}
          onClick={() => navigate("/exhibitor/home")}
        >
          <CalendarDays size={16} className="inline mr-1" />
          Events
        </div>

        <div
          className={navItem("/exhibitor/my-bookings")}
          onClick={() => navigate("/exhibitor/my-bookings")}
        >
          <Store size={16} className="inline mr-1" />
          My Bookings
        </div>
        <div
          className={navItem("/exhibitor/upcoming-events")}
          onClick={() => navigate("/exhibitor/upcoming-events")}
        >
          <Store size={16} className="inline mr-1" />
          UpComing Event
        </div>
      </div>
    </div>
  );
};

export default ExhibitorNavbar;