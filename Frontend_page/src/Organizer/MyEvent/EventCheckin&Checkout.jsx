import React, { useState } from "react";

export default function EventCheckIn() {
  const [page, setPage] = useState("events"); // events | visitors | details
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  // Sample data
  const events = [
    { code: "EVT-25", name: "MRC Event", arrived: 1, departed: 6, present: 7 },
    { code: "EVT-22", name: "VALLUVAR KOTTAM PARK", arrived: 0, departed: 0, present: 0 },
    { code: "EVT-12", name: "LOGMAT EXPO - 2025", arrived: 0, departed: 0, present: 0 },
  ];

  const visitors = [
    {
      event: "MRC Event",
      code: "VIS-4595",
      name: "vasanth",
      category: "Visitors (1)",
      checkin: "01/08/2025 11:40 AM",
      checkout: "01/08/2025 11:42 AM",
      createdBy: "Leiten Technologies Pvt Ltd",
      createdOn: "01/08/2025",
    },
    {
      event: "MRC Event",
      code: "VIS-4594",
      name: "Ajmal Khan",
      category: "Visitors (1)",
      checkin: "01/08/2025 10:55 AM",
      checkout: "01/08/2025 10:56 AM",
      createdBy: "Leiten Technologies Pvt Ltd",
      createdOn: "01/08/2025",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* Page 1: Events */}
      {page === "events" && (
        <div>
          <h1 className="text-3xl font-bold mb-6">Event Check-In / Check-Out</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg shadow">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border">Action</th>
                  <th className="px-4 py-2 border">Event Code</th>
                  <th className="px-4 py-2 border">Event Name</th>
                  <th className="px-4 py-2 border">Guests Arrived</th>
                  <th className="px-4 py-2 border">Guests Departed</th>
                  <th className="px-4 py-2 border">Total Present</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => {
                          setSelectedEvent(e);
                          setPage("visitors");
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        👁️
                      </button>
                    </td>
                    <td className="px-4 py-2 border">{e.code}</td>
                    <td className="px-4 py-2 border">{e.name}</td>
                    <td className="px-4 py-2 border">{e.arrived}</td>
                    <td className="px-4 py-2 border">{e.departed}</td>
                    <td className="px-4 py-2 border">{e.present}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Page 2: Visitors */}
      {page === "visitors" && (
        <div>
          <h1 className="text-3xl font-bold mb-6">Visitors - {selectedEvent?.name}</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg shadow">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border">Action</th>
                  <th className="px-4 py-2 border">Event Name</th>
                  <th className="px-4 py-2 border">Visitor Code</th>
                  <th className="px-4 py-2 border">Visitor Name</th>
                  <th className="px-4 py-2 border">Pass Category</th>
                  <th className="px-4 py-2 border">Check-in Time</th>
                  <th className="px-4 py-2 border">Checkout Time</th>
                  <th className="px-4 py-2 border">Created By</th>
                  <th className="px-4 py-2 border">Created On</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((v, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => {
                          setSelectedVisitor(v);
                          setPage("details");
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        👁️
                      </button>
                    </td>
                    <td className="px-4 py-2 border">{v.event}</td>
                    <td className="px-4 py-2 border">{v.code}</td>
                    <td className="px-4 py-2 border">{v.name}</td>
                    <td className="px-4 py-2 border">{v.category}</td>
                    <td className="px-4 py-2 border">{v.checkin}</td>
                    <td className="px-4 py-2 border">{v.checkout}</td>
                    <td className="px-4 py-2 border">{v.createdBy}</td>
                    <td className="px-4 py-2 border">{v.createdOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Page 3: Visitor Details */}
      {page === "details" && (
        <div>
          <h1 className="text-3xl font-bold mb-6">Visitor Details</h1>
          <div className="flex justify-end space-x-6 mb-6">
            <div className="bg-green-100 px-4 py-2 rounded">Guests Arrived: 0</div>
            <div className="bg-red-100 px-4 py-2 rounded">Guests Departed: 0</div>
            <div className="bg-blue-100 px-4 py-2 rounded">Total Present: 0</div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {/* Basic Details */}
            <div className="border p-4 rounded bg-white shadow">
              <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
              <p><strong>Event:</strong> {selectedVisitor?.event}</p>
              <p><strong>Visitor Code:</strong> {selectedVisitor?.code}</p>
              <p><strong>Check-Out Time:</strong> {selectedVisitor?.checkout}</p>
              <div className="mt-2">
                <label>
                  <input type="checkbox" checked readOnly /> Check-Out
                </label>
              </div>
            </div>

            {/* Visitor Information */}
            <div className="border p-4 rounded bg-white shadow">
              <h2 className="text-xl font-semibold mb-4">Visitor Information</h2>
              <p><strong>Name:</strong> {selectedVisitor?.name}</p>
              <p><strong>Contact Number:</strong> N/A</p>
              <p><strong>Pass Count:</strong> 1</p>
              <p><strong>Pass Category:</strong> {selectedVisitor?.category}</p>
              <p><strong>User Type:</strong> Visitor</p>
              <p><strong>Check-In Time:</strong> {selectedVisitor?.checkin}</p>
              <p><strong>Check-Out Time:</strong> {selectedVisitor?.checkout}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}