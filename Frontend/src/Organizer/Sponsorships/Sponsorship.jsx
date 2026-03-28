import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Plus, X, CheckCircle, AlertCircle } from "lucide-react";

export const SponsorshipPage = () => {
  const [sponsors, setSponsors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [viewData, setViewData] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    sponsor_name: "",
    primary_contact: "",
    secondary_contact: "",
    mail_id: "",
    address: "",
    status: "Active",
    sponsor_image: "",
  });

  const [documents, setDocuments] = useState([
    {
      document_type: "",
      document_number: "",
      document_file: "",
      preview: "",
    },
  ]);

  useEffect(() => {
    loadSponsors();
  }, []);

  // Auto-close toast after 5 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // ================= TOAST NOTIFICATION =================

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // ================= LOAD SPONSORS =================

  const loadSponsors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/superadmin/api/sponsors",
      );
      setSponsors(res.data);
    } catch (error) {
      showToast("Failed to load sponsors", "error");
    }
  };

  // ================= FORM =================

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setImagePreview(reader.result);

      setForm({
        ...form,
        sponsor_image: reader.result,
      });
    };
  };

  // ================= DOCUMENT =================

  const handleDocChange = (e, index) => {
    const temp = [...documents];

    temp[index][e.target.name] = e.target.value;

    setDocuments(temp);
  };

  const handleDocument = (e, index) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const temp = [...documents];

      temp[index].document_file = reader.result;
      temp[index].preview = reader.result;

      setDocuments(temp);
    };
  };

  const addDocument = () => {
    setDocuments([
      ...documents,
      {
        document_type: "",
        document_number: "",
        document_file: "",
        preview: "",
      },
    ]);
  };

  // ================= SAVE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/superadmin/api/create_sponsor", {
        ...form,
      });

      showToast("✓ Sponsor Created Successfully!", "success");

      setShowForm(false);
      
      // Reset form
      setForm({
        sponsor_name: "",
        primary_contact: "",
        secondary_contact: "",
        mail_id: "",
        address: "",
        status: "Active",
        sponsor_image: "",
      });
      
      setDocuments([
        {
          document_type: "",
          document_number: "",
          document_file: "",
          preview: "",
        },
      ]);
      
      setImagePreview(null);

      loadSponsors();
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to create sponsor. Please try again.",
        "error"
      );
    }
  };

  // ================= VIEW =================

  const viewSponsor = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/superadmin/api/sponsor/${id}`,
      );

      setViewData(res.data);
    } catch (error) {
      showToast("Failed to load sponsor details", "error");
    }
  };

  const closeModal = () => {
    setViewData(null);
  };

  // ================= SEARCH =================

  const filteredSponsors = sponsors.filter(
    (s) =>
      (s.sponsor_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.sponsor_code || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.address || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-10 text-black"style={{  backgroundColor: "#acbdc7",width: "100%", minHeight: "94%"}}>
      {/* TOAST NOTIFICATION */}
      
      {toast && (
        <div
          className={`fixed top-5 right-5 flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl z-[9999] animate-in fade-in slide-in-from-top ${
            toast.type === "success"
              ? "bg-green-600 border border-green-500"
              : "bg-red-600 border border-red-500"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle size={24} className="text-white flex-shrink-0" />
          ) : (
            <AlertCircle size={24} className="text-white flex-shrink-0" />
          )}
          <span className="text-white font-medium">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-white hover:text-gray-200 transition"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* HEADER */}

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Sponsor Management</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-sky-500 px-4 py-2 rounded flex gap-2 items-center hover:bg-sky-600 transition"
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
        className="w-full mb-6 p-3 rounded  text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"style={{ backgroundColor: "#81a2b5" }}
      />
      {/* TABLE */}

      <table className="w-full rounded" style={{ backgroundColor: "#939ea4" }}>
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
            <tr key={s.id} className="border-b border-slate-700 hover:bg-slate-700 transition">
              <td className="p-3">
                <button
                  onClick={() => viewSponsor(s.id)}
                  className="text-black-400 hover:text-blue-300 transition"
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl w-[900px] max-h-[90vh] overflow-y-auto">
            {/* HEADER */}

            <div className="flex justify-between items-center px-8 py-5 border-b border-slate-700 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl">
              <h2 className="text-2xl font-semibold text-white">
                Sponsor Details
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="text-white hover:text-red-300 transition"
              >
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* SPONSOR DETAILS */}

              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                <h3 className="text-lg font-semibold text-indigo-400 mb-5">
                  Sponsor Information
                </h3>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-slate-400">
                      Sponsor Name *
                    </label>

                    <input
                      name="sponsor_name"
                      placeholder="Enter Sponsor Name"
                      value={form.sponsor_name}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 rounded bg-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-slate-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400">
                      Primary Contact No *
                    </label>

                    <input
                      name="primary_contact"
                      placeholder="Enter Primary Contact No"
                      value={form.primary_contact}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 rounded bg-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-slate-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400">
                      Secondary Contact No
                    </label>

                    <input
                      name="secondary_contact"
                      placeholder="Enter Secondary Contact No"
                      value={form.secondary_contact}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 rounded bg-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400">Mail ID *</label>

                    <input
                      name="mail_id"
                      placeholder="Enter Mail ID"
                      value={form.mail_id}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 rounded bg-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-slate-500"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-sm text-slate-400">Address *</label>

                    <textarea
                      name="address"
                      placeholder="Enter Address"
                      value={form.address}
                      onChange={handleChange}
                      className="w-full mt-1 p-3 rounded bg-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-slate-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* DOCUMENTS */}

              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                <h3 className="text-lg font-semibold mb-5 text-indigo-400">
                  Sponsor Documents
                </h3>

                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 mb-4 bg-slate-700 p-4 rounded-lg"
                  >
                    <select
                      name="document_type"
                      value={doc.document_type}
                      onChange={(e) => handleDocChange(e, index)}
                      className="p-3 rounded bg-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none text-white"
                    >
                      <option>Select Document</option>
                      <option>Aadhar</option>
                      <option>PAN</option>
                      <option>License</option>
                    </select>

                    <input
                      name="document_number"
                      placeholder="Document Number"
                      value={doc.document_number}
                      onChange={(e) => handleDocChange(e, index)}
                      className="p-3 rounded bg-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-slate-500"
                    />

                    <input
                      type="file"
                      onChange={(e) => handleDocument(e, index)}
                      className="text-sm text-slate-300"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addDocument}
                  className="bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-lg text-white font-medium"
                >
                  + Add Document
                </button>
              </div>

              {/* SAVE BUTTON */}

              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition transform p-4 rounded-xl font-semibold text-lg text-white"
                >
                  Save Sponsor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= VIEW MODAL ================= */}

      {viewData && (
  <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
    <div className="bg-slate-900 w-[700px] p-8 rounded-xl border border-slate-700 shadow-2xl">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold text-indigo-400">
          Sponsor Details
        </h2>
        <button
          onClick={closeModal}
          className="text-white hover:text-red-300 transition"
        >
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Sponsor Code */}
        <div>
          <label className="text-slate-400 text-sm block mb-2">
            Sponsor Code
          </label>
          <input
            type="text"
            disabled
            value={viewData.sponsor_code}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Sponsor Name */}
        <div>
          <label className="text-slate-400 text-sm block mb-2">
            Sponsor Name
          </label>
          <input
            type="text"
            disabled
            value={viewData.sponsor_name}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Primary Contact */}
        <div>
          <label className="text-slate-400 text-sm block mb-2">
            Primary Contact
          </label>
          <input
            type="text"
            disabled
            value={viewData.primary_contact}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Secondary Contact */}
        <div>
          <label className="text-slate-400 text-sm block mb-2">
            Secondary Contact
          </label>
          <input
            type="text"
            disabled
            value={viewData.secondary_contact}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Mail ID */}
        <div>
          <label className="text-slate-400 text-sm block mb-2">
            Mail ID
          </label>
          <input
            type="email"
            disabled
            value={viewData.mail_id}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Status */}
        <div>
          <label className="text-slate-400 text-sm block mb-2">
            Status
          </label>
          <input
            type="text"
            disabled
            value={viewData.status}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label className="text-slate-400 text-sm block mb-2">
            Address
          </label>
          <textarea
            disabled
            value={viewData.address}
            rows="3"
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};