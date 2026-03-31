import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Eye,
  ArrowLeft,
  ChevronDown,
  ArrowUpDown
} from "lucide-react";

export const AbstractVerification = () => {

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Fetch data using axios
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://api.example.com/events"); 
      setEvents(res.data);
    } catch (err) {

      // fallback dummy data if API not available
      setEvents([
        {
          eventCode: "EVT-11",
          eventName: "DISTRICT CONFERENCE 2025",
          inprocess: 0,
          approved: 0,
          rejected: 0
        },
        {
          eventCode: "EVT-5",
          eventName: "MedTech for CSI: Advancements in Medicine",
          inprocess: 0,
          approved: 0,
          rejected: 0
        }
      ]);
    }
  };

  // Filter events
  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f3f6f9] p-6 font-sans">

      {/* LIST PAGE */}
      {!selectedEvent && (
        <>
          <h1 className="text-2xl font-semibold text-[#4e678b] mb-6">
            Abstract Verification
          </h1>

          <div className="bg-white p-6 rounded-lg shadow-sm">

            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search Keyword"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">

                <thead>
                  <tr className="bg-[#f8fafd] text-[#4e678b] text-sm">

                    <th className="border p-3 text-center">Action</th>

                    <th className="border p-3">
                      <div className="flex items-center gap-1">
                        Event Code <ArrowUpDown size={14} />
                      </div>
                    </th>

                    <th className="border p-3">
                      <div className="flex items-center gap-1">
                        Event Name <ArrowUpDown size={14} />
                      </div>
                    </th>

                    <th className="border p-3">Inprocess</th>
                    <th className="border p-3">Approved</th>
                    <th className="border p-3">Rejected</th>

                  </tr>
                </thead>

                <tbody>

                  {filteredEvents.map((event, index) => (
                    <tr key={index} className="text-sm">

                      <td className="border p-3 text-center">
                        <button
                          onClick={() => setSelectedEvent(event)}
                          className="border px-3 py-1 rounded hover:bg-gray-50"
                        >
                          <Eye size={16} />
                        </button>
                      </td>

                      <td className="border p-3">{event.eventCode}</td>
                      <td className="border p-3">{event.eventName}</td>
                      <td className="border p-3">{event.inprocess}</td>
                      <td className="border p-3">{event.approved}</td>
                      <td className="border p-3">{event.rejected}</td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* DETAIL PAGE */}
      {selectedEvent && (
        <div className="bg-white rounded-lg shadow-sm">

          <header className="flex justify-between items-center p-4 border-b">

            <div className="flex items-center gap-4">

              <button
                onClick={() => setSelectedEvent(null)}
                className="text-[#4e678b]"
              >
                <ArrowLeft size={20} />
              </button>

              <h2 className="text-lg font-semibold text-[#4e678b]">
                {selectedEvent.eventName}
              </h2>

            </div>

            <div className="flex items-center gap-4">

              <input
                type="text"
                placeholder="Search Abstract"
                className="border px-3 py-1 rounded text-sm"
              />

              <div className="flex items-center gap-2">

                <span className="text-sm">View By:</span>

                <div className="relative">

                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border px-3 py-1 pr-6 rounded text-sm"
                  >
                    <option>All</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                    <option>Inprocess</option>
                  </select>

                  <ChevronDown
                    size={14}
                    className="absolute right-2 top-2 text-gray-500"
                  />

                </div>

              </div>

            </div>

          </header>

          <div className="p-8 h-[70vh] flex items-center justify-center border-dashed border-2 border-gray-300 m-6 rounded-lg">
            <p className="text-gray-400">
              Abstract content for <b>{selectedEvent.eventName}</b> will appear here
            </p>
          </div>

        </div>
      )}
    </div>
  );
};

