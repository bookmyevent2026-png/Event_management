import { useState, useEffect } from "react";
import axios from "axios";

export const Contacts = () => {

  const [page, setPage] = useState("home");
  const [manual, setManual] = useState(true);

  const [contacts, setContacts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    userType: "",
    groupName: ""
  });

  // FETCH CONTACTS
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/contacts");
      setContacts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addContact = async () => {
    try {

      await axios.post("http://localhost:5000/contacts", formData);

      fetchContacts();

      setFormData({
        name: "",
        email: "",
        mobile: "",
        userType: "",
        groupName: ""
      });

    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      userType: "",
      groupName: ""
    });
  };

  // ---------------- HOME PAGE ----------------

  if (page === "home") {

    return (
      <div className="h-screen bg-gray-100">

        <div className="flex justify-between items-center bg-white shadow p-4">

          <h1 className="text-2xl font-semibold text-gray-700">
            My Contacts
          </h1>

          <div className="flex gap-4 items-center">

            <input
              placeholder="Search by Contact Group"
              className="border rounded px-3 py-2 w-64"
            />

            <button
              onClick={() => setPage("contacts")}
              className="border rounded p-2 hover:bg-gray-100"
            >
              +
            </button>

          </div>

        </div>

        <div className="flex items-center justify-center h-full text-gray-400">
        </div>

      </div>
    );
  }

  // ---------------- CONTACT FORM PAGE ----------------

  return (

    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <div className="flex justify-between items-center bg-white shadow p-4">

        <h1 className="text-2xl font-semibold text-gray-700">
          My Contacts
        </h1>

        <button
          onClick={() => setPage("home")}
          className="border px-3 py-1 rounded"
        >
          Back
        </button>

      </div>

      <div className="grid grid-cols-2 gap-4 p-4">

        {/* LEFT PANEL */}

        <div className="bg-white rounded shadow p-6">

          <h2 className="text-xl text-blue-600 mb-4">
            Contact Details
          </h2>

          {/* TOGGLE */}

          <div className="flex items-center gap-4 mb-6">

            <span>Manual</span>

            <button
              onClick={() => setManual(!manual)}
              className={`w-12 h-6 flex items-center rounded-full p-1
              ${manual ? "bg-blue-500" : "bg-gray-400"}`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full transform
                ${manual ? "translate-x-6" : ""}`}
              />
            </button>

            <span>Document</span>

          </div>

          {/* MANUAL FORM */}

          {manual ? (

            <div className="space-y-4">

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                className="w-full border p-2 rounded"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Mail ID"
                className="w-full border p-2 rounded"
              />

              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter Contact Number"
                className="w-full border p-2 rounded"
              />

              <div className="grid grid-cols-2 gap-4">

                <input
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  placeholder="User Type"
                  className="border p-2 rounded"
                />

                <input
                  name="groupName"
                  value={formData.groupName}
                  onChange={handleChange}
                  placeholder="Group Name"
                  className="border p-2 rounded"
                />

              </div>

              <div className="flex gap-4 pt-2">

                <button
                  onClick={addContact}
                  className="border border-blue-500 text-blue-500 px-4 py-2 rounded"
                >
                  Add
                </button>

                <button
                  onClick={clearForm}
                  className="border border-blue-500 text-blue-500 px-4 py-2 rounded"
                >
                  Clear
                </button>

              </div>

            </div>

          ) : (

            <div>

              <div className="border-dashed border-2 p-10 text-center rounded text-gray-500">
                Upload Contacts
              </div>

              <div className="mt-4 text-sm text-blue-600">
                Download Template
              </div>

              <div className="bg-yellow-100 border mt-4 p-4 rounded text-sm">

                <b>Tips</b>

                <ul className="list-disc ml-4">

                  <li>Please Download the Template</li>
                  <li>Do not change Excel File Name</li>

                </ul>

              </div>

            </div>

          )}

        </div>

        {/* SUMMARY TABLE */}

        <div className="bg-white rounded shadow p-6">

          <h2 className="text-xl text-blue-600 mb-4">
            Summary
          </h2>

          <table className="w-full border">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-2 border">Action</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Mail ID</th>
                <th className="p-2 border">Mobile No</th>
                <th className="p-2 border">User Type</th>
                <th className="p-2 border">Group Name</th>

              </tr>

            </thead>

            <tbody>

              {contacts.length === 0 ? (

                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No Data Found.
                  </td>
                </tr>

              ) : (

                contacts.map((contact, index) => (

                  <tr key={index}>

                    <td className="border p-2">-</td>
                    <td className="border p-2">{contact.name}</td>
                    <td className="border p-2">{contact.email}</td>
                    <td className="border p-2">{contact.mobile}</td>
                    <td className="border p-2">{contact.userType}</td>
                    <td className="border p-2">{contact.groupName}</td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

          <div className="text-sm text-gray-500 mt-4">
            Showing {contacts.length} entries
          </div>

        </div>

      </div>

    </div>
  );
}