import { useState } from "react";

export const ProgramVerification = () => {
  const [page, setPage] = useState("list");

  const data = [
    {
      code: "EVT-9",
      name: "Furniture and Home Products Expo",
      inprocess: 0,
      approved: 1,
      rejected: 0,
    },
    {
      code: "EVT-11",
      name: "DISTRICT CONFERENCE 2025",
      inprocess: 0,
      approved: 0,
      rejected: 0,
    },
    {
      code: "EVT-5",
      name: "MedTech for CSI: Advancements in Medicine",
      inprocess: 0,
      approved: 1,
      rejected: 0,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* ================= PAGE 1 ================= */}

      {page === "list" && (
        <>
          <h1 className="text-3xl font-semibold text-gray-700 mb-6">
            Program Verification
          </h1>

          <div className="bg-white shadow rounded-lg p-6">
            <input
              type="text"
              placeholder="Search Keyword"
              className="border px-4 py-2 mb-6 w-72 rounded"
            />

            <table className="w-full border">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3 border">Action</th>
                  <th className="p-3 border">Event Code ↑↓</th>
                  <th className="p-3 border">Event Name ↑↓</th>
                  <th className="p-3 border">Inprocess</th>
                  <th className="p-3 border">Approved</th>
                  <th className="p-3 border">Rejected</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-3">
                      <button
                        onClick={() => setPage("details")}
                        className="border px-3 py-1 rounded hover:bg-gray-200"
                      >
                        👁
                      </button>
                    </td>

                    <td className="border p-3">{item.code}</td>

                    <td className="border p-3 text-left">{item.name}</td>

                    <td className="border p-3">{item.inprocess}</td>

                    <td className="border p-3">{item.approved}</td>

                    <td className="border p-3">{item.rejected}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-6">
              <p className="text-gray-500">Showing 1 to 3 of 3 entries</p>

              <select className="border px-2 py-1">
                <option>10</option>
                <option>20</option>
              </select>
            </div>
          </div>
        </>
      )}

      {/* ================= PAGE 2 ================= */}

      {page === "details" && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-700">
              Program Verification
            </h1>

            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search by Program Names"
                className="border px-4 py-2 rounded"
              />

              <select className="border px-3 py-2 rounded">
                <option>All</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>

              <button className="border px-4 py-2 rounded">🔍</button>
            </div>
          </div>

          <button
            onClick={() => setPage("list")}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>
        </>
      )}
    </div>
  );
};
