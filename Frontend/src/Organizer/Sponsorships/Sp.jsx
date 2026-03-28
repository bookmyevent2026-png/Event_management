import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Plus, X } from "lucide-react";

export const SponsorshipPage = () => {

  const [sponsors, setSponsors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    sponsor_name: "",
    primary_contact: "",
    secondary_contact: "",
    mail_id: "",
    address: "",
    status: "Active",
  });

  useEffect(() => {
    loadSponsors();
  }, []);

  // ================= LOAD SPONSORS =================

  const loadSponsors = async () => {
    const res = await axios.get(
      "http://localhost:5000/superadmin/api/sponsors"
    );
    setSponsors(res.data);
  };

  // ================= FORM CHANGE =================

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SAVE =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    await axios.post(
      "http://localhost:5000/superadmin/api/create_sponsor",
      form
    );

    alert("Sponsor Created");

    setShowForm(false);

    setForm({
      sponsor_name: "",
      primary_contact: "",
      secondary_contact: "",
      mail_id: "",
      address: "",
      status: "Active",
    });

    loadSponsors();
  };

  // ================= VIEW =================

  const viewSponsor = async (id) => {

    const res = await axios.get(
      `http://localhost:5000/superadmin/api/sponsor/${id}`
    );

    setViewData(res.data);
  };

  const closeModal = () => {
    setViewData(null);
  };

  // ================= SEARCH =================

  const filteredSponsors = sponsors.filter(
    (s) =>
      (s.sponsor_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.sponsor_code || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.address || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-10 bg-slate-900 min-h-screen text-white">

      {/* HEADER */}

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Sponsor Management
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 px-4 py-2 rounded flex gap-2 items-center"
        >
          <Plus size={18} />
          Add Sponsor
        </button>

      </div>

      {/* SEARCH */}

      <input
        placeholder="Search Sponsor..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-6 p-3 rounded bg-slate-800"
      />

      {/* TABLE */}

      <table className="w-full bg-slate-800 rounded">

        <thead>
          <tr className="text-left border-b border-slate-700">

            <th className="p-3">Action</th>
            <th className="p-3">Sponsor Code</th>
            <th className="p-3">Sponsor Name</th>
            <th className="p-3">Primary Contact</th>
            <th className="p-3">Mail ID</th>
            <th className="p-3">Address</th>
            <th className="p-3">Status</th>

          </tr>
        </thead>

        <tbody>

          {filteredSponsors.map((s) => (

            <tr key={s.id} className="border-b border-slate-700">

              <td className="p-3">

                <button
                  onClick={() => viewSponsor(s.id)}
                  className="text-blue-400"
                >
                  <Eye />
                </button>

              </td>

              <td className="p-3">{s.sponsor_code}</td>
              <td className="p-3">{s.sponsor_name}</td>
              <td className="p-3">{s.primary_contact}</td>
              <td className="p-3">{s.mail_id}</td>
              <td className="p-3">{s.address}</td>
              <td className="p-3">{s.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* ================= CREATE MODAL ================= */}

      {showForm && (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

          <div className="bg-slate-900 w-[800px] p-8 rounded-xl">

            <div className="flex justify-between mb-6">

              <h2 className="text-xl font-bold">
                Create Sponsor
              </h2>

              <button onClick={() => setShowForm(false)}>
                <X />
              </button>

            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="sponsor_name"
                placeholder="Sponsor Name"
                value={form.sponsor_name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-800"
                required
              />

              <input
                name="primary_contact"
                placeholder="Primary Contact"
                value={form.primary_contact}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-800"
                required
              />

              <input
                name="secondary_contact"
                placeholder="Secondary Contact"
                value={form.secondary_contact}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-800"
              />

              <input
                name="mail_id"
                placeholder="Mail ID"
                value={form.mail_id}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-800"
                required
              />

              <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-800"
                required
              />

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-3 rounded bg-slate-800"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <button
                type="submit"
                className="w-full bg-green-600 p-3 rounded"
              >
                Save Sponsor
              </button>

            </form>

          </div>

        </div>

      )}

      {/* ================= VIEW MODAL ================= */}

      {viewData && (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

          <div className="bg-slate-900 w-[600px] p-8 rounded-xl">

            <div className="flex justify-between mb-6">

              <h2 className="text-xl font-bold">
                Sponsor Details
              </h2>

              <button onClick={closeModal}>
                <X />
              </button>

            </div>

            <div className="space-y-3">

              <p><b>Sponsor Code:</b> {viewData.sponsor_code}</p>

              <p><b>Sponsor Name:</b> {viewData.sponsor_name}</p>

              <p><b>Primary Contact:</b> {viewData.primary_contact}</p>

              <p><b>Secondary Contact:</b> {viewData.secondary_contact}</p>

              <p><b>Mail ID:</b> {viewData.mail_id}</p>

              <p><b>Status:</b> {viewData.status}</p>

              <p><b>Address:</b> {viewData.address}</p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};