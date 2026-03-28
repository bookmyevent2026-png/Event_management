import React, { useState } from "react";

export default function MessagesGreetings() {
  const [page, setPage] = useState("list"); // list or form
  const [events] = useState([
    { code: "EVT-25", name: "MRC Event", start: "31/07/2025", end: "01/08/2025" },
    { code: "EVT-22", name: "VALLUVAR KOTTAM PARK", start: "21/07/2025", end: "31/07/2025" },
  ]);
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    group: "",
    topic: "",
    subTopic: "",
    description: "",
    image: null,
    imagePreview: null,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleAddMessage = () => {
    if (!formData.group || !formData.description) {
      alert("Message Group and Description are required");
      return;
    }
    setMessages([...messages, { ...formData }]);
    setFormData({
      group: "",
      topic: "",
      subTopic: "",
      description: "",
      image: null,
      imagePreview: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {page === "list" && (
        <div>
          <h1 className="text-3xl font-bold mb-6">Messages & Greetings</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg shadow">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border">Action</th>
                  <th className="px-4 py-2 border">Event Code</th>
                  <th className="px-4 py-2 border">Event Name</th>
                  <th className="px-4 py-2 border">Event StartDate</th>
                  <th className="px-4 py-2 border">Event EndDate</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => setPage("form")}
                        className="text-blue-600 hover:underline"
                      >
                        ✔ Check-in
                      </button>
                    </td>
                    <td className="px-4 py-2 border">{e.code}</td>
                    <td className="px-4 py-2 border">{e.name}</td>
                    <td className="px-4 py-2 border">{e.start}</td>
                    <td className="px-4 py-2 border">{e.end}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {page === "form" && (
        <div>
          <h1 className="text-3xl font-bold mb-6">Messages & Greetings</h1>
          <div className="grid grid-cols-2 gap-8">
            {/* Left side */}
            <div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Message Group *</label>
                <select
                  value={formData.group}
                  onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Group</option>
                  <option value="General">General</option>
                  <option value="Greetings">Greetings</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Topics"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="border p-2 rounded w-full mb-4"
              />
              <input
                type="text"
                placeholder="Sub-Topics"
                value={formData.subTopic}
                onChange={(e) => setFormData({ ...formData, subTopic: e.target.value })}
                className="border p-2 rounded w-full mb-4"
              />
              <div className="mb-4">
                <label className="block font-medium mb-2">Image Upload</label>
                <input
                  type="file"
                  accept=".jpg,.png,.webp"
                  onChange={handleImageUpload}
                  className="border p-2 rounded w-full"
                />
                {/* Square preview box */}
                {formData.imagePreview && (
                  <div className="mt-4 w-40 h-40 border rounded overflow-hidden">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right side */}
            <div>
              <label className="block font-medium mb-2">Description *</label>
              <textarea
                placeholder="Insert text here ..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border p-2 rounded w-full h-40 mb-4"
              />
              <div className="space-x-4 mb-6">
                <button
                  onClick={handleAddMessage}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Add
                </button>
                <button
                  onClick={() =>
                    setFormData({
                      group: "",
                      topic: "",
                      subTopic: "",
                      description: "",
                      image: null,
                      imagePreview: null,
                    })
                  }
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                >
                  Clear
                </button>
              </div>

              {/* Summary Table */}
              <table className="min-w-full border border-gray-300 rounded-lg shadow">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-2 border">Action</th>
                    <th className="px-4 py-2 border">Message Group</th>
                    <th className="px-4 py-2 border">Topics</th>
                    <th className="px-4 py-2 border">Sub-Topics</th>
                    <th className="px-4 py-2 border">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-gray-500 py-6 border">
                        No Data Found
                      </td>
                    </tr>
                  ) : (
                    messages.map((m, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">✎</td>
                        <td className="px-4 py-2 border">{m.group}</td>
                        <td className="px-4 py-2 border">{m.topic}</td>
                        <td className="px-4 py-2 border">{m.subTopic}</td>
                        <td className="px-4 py-2 border">{m.description}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}