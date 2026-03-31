import React from "react";

export const ProgramCheckin = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">
        Program Check-In / Check-Out
      </h1>

      {/* Card Container */}
      <div className="bg-white shadow rounded-lg p-4 border">

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Keyword"
            className="border rounded-md px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="min-w-full border border-gray-300">

            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="border px-4 py-2 text-left">Action</th>
                <th className="border px-4 py-2 text-left">
                  Event Code ↑↓
                </th>
                <th className="border px-4 py-2 text-left">
                  Event Name ↑↓
                </th>
                <th className="border px-4 py-2 text-left">
                  Event Start Date ↑↓
                </th>
                <th className="border px-4 py-2 text-left">
                  Event End Date ↑↓
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 border"
                >
                  No Data Found.
                </td>
              </tr>
            </tbody>

          </table>

        </div>

        {/* Footer Pagination */}
        <div className="flex items-center justify-between mt-4 text-gray-600 text-sm">

          <div>
            Showing 0 to 0 of 0 entries
          </div>

          <div className="flex items-center space-x-2">

            <button className="px-2 py-1 border rounded hover:bg-gray-100">
              «
            </button>

            <button className="px-2 py-1 border rounded hover:bg-gray-100">
              ‹
            </button>

            <button className="px-2 py-1 border rounded hover:bg-gray-100">
              ›
            </button>

            <button className="px-2 py-1 border rounded hover:bg-gray-100">
              »
            </button>

            <select className="border px-2 py-1 rounded">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>

          </div>

        </div>

      </div>
    </div>
  );
};


