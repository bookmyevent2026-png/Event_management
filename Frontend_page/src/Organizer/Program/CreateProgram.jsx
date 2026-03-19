import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { getevent } from "../../Services/api";

export const CreateProgram = () => {

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const getEvents = async () => {
    try {
      const res = await getevent();

      setEvents(res.data || []);
    }
    catch (err) {
      console.log("API Error:", err);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const filtered = events.filter((e) =>
    (e.event_name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        My Programs
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6">

        <input
          type="text"
          placeholder="Search Keyword"
          className="border rounded-lg px-4 py-2 mb-4 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="w-full border">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Event Code</th>
              <th className="p-3 text-left">Event Name</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((event, i) => (
              <tr key={i} className="border-t hover:bg-gray-100">

                <td className="p-3">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    <Eye size={18} />
                  </button>
                </td>

                <td className="p-3">{event.event_code}</td>
                <td className="p-3">{event.event_name}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};