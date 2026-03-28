import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Plus, X, CheckCircle, AlertCircle } from "lucide-react";
import {
  getVenues,
  getCountries,
  getStates,
  getCities,
} from "../../Services/api";

export const Venuepage = () => {
  const [venues, setVenues] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [viewData, setViewData] = useState(null);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [toast, setToast] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    venue_name: "",
    address: "",
    country: "",
    state: "",
    city: "",
    status: "Active",
    venue_image: "",
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
    loadVenues();
    loadCountries();
  }, []);

  // ================= TOAST NOTIFICATION =================

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // ================= VENUES =================

  const loadVenues = async () => {
    try {
      const res = await getVenues();
      setVenues(res);
      console.log(res);
    } catch (error) {
      console.error("Error loading venues:", error);
    }
  };

  const loadCountries = async () => {
    try {
      const res = await getCountries();
      setCountries(res);
    } catch (error) {
      console.error("Error loading countries:", error);
    }
  };

  const loadStates = async (id) => {
    try {
      const res = await getStates(id);
      setStates(res);
    } catch (error) {
      console.error("Error loading states:", error);
    }
  };

  const loadCities = async (id) => {
    try {
      const res = await getCities(id);
      setCities(res);
    } catch (error) {
      console.error("Error loading cities:", error);
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
        venue_image: reader.result,
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

    await axios.post("http://localhost:5000/superadmin/api/create_venue", {
      ...form,
      documents: documents.filter((d) => d.document_type && d.document_number),
    });

    showToast("✓ Venue Created Successfully!", "success");

    setShowForm(false);

    loadVenues();
  };

  // ================= VIEW =================

  const viewVenue = async (id) => {
    const res = await axios.get(
      `http://localhost:5000/superadmin/api/venuedetail/${id}`,
    );

    setViewData(res.data);
  };

  const closeModal = () => {
    setViewData(null);
  };

  // ================= SEARCH =================

  const filteredVenues = venues.filter(
    (v) =>
      (v.venue_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.venue_code || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.address || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // ================= UI =================

  return (
    <div
      className="p-10 text-black"
      style={{ backgroundColor: "#acbdc7", width: "100%", minHeight: "100%" }}
    >
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

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Venue Management</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-sky-500 px-4 py-2 rounded flex gap-2 items-center hover:bg-sky-600 transition"
        >
          <Plus size={18} />
          Add Venue
        </button>
      </div>

      <input
        placeholder="Search Venue..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-6 p-3 rounded  text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"
        style={{ backgroundColor: "#81a2b5" }}
      />

      {/* TABLE */}

      <table className="w-full rounded" style={{ backgroundColor: "#939ea4" }}>
        <thead>
          <tr className="text-left border-b border-slate-700">
            <th className="p-3">Action</th>
            <th className="p-3">Code</th>
            <th className="p-3">Venue</th>
            <th className="p-3">Address</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredVenues.map((v) => (
            <tr key={v.id} className="border-b border-slate-700">
              <td className="p-3">
                <button
                  onClick={() => viewVenue(v.id)}
                  className="text-black-400"
                >
                  <Eye />
                </button>
              </td>

              <td className="p-3">{v.venue_code}</td>

              <td className="p-3">{v.venue_name}</td>

              <td className="p-3">{v.address}</td>

              <td className="p-3">{v.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= CREATE MODAL ================= */}

      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl w-[1000px] max-h-[90vh] overflow-y-auto">
            {/* HEADER */}

            <div className="flex justify-between items-center px-8 py-5 border-b border-slate-700 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl">
              <h2 className="text-2xl font-semibold text-white">
                Create Venue
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="text-white hover:text-red-300 transition"
              >
                <X size={28} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-8 grid grid-cols-3 gap-8"
            >
              {/* IMAGE UPLOAD */}

              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-indigo-400">
                  Venue Image
                </h3>

                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-600 rounded-lg p-6 cursor-pointer hover:border-indigo-400 transition">
                  <span className="text-slate-400 mb-2">Upload Image</span>

                  <input
                    type="file"
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>

                {imagePreview && (
                  <img
                    src={imagePreview}
                    className="mt-4 rounded-lg h-40 w-full object-cover border border-slate-700"
                  />
                )}
              </div>

              {/* LOCATION DETAILS */}

              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg space-y-4">
                <h3 className="text-lg font-semibold text-indigo-400">
                  Location Details
                </h3>

                <input
                  name="venue_name"
                  placeholder="Venue Name"
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <textarea
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <select
                  name="country"
                  onChange={(e) => {
                    handleChange(e);
                    loadStates(e.target.value);
                  }}
                  className="w-full p-3 rounded bg-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option>Select Country</option>

                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.country_name}
                    </option>
                  ))}
                </select>

                <select
                  name="state"
                  onChange={(e) => {
                    handleChange(e);
                    loadCities(e.target.value);
                  }}
                  className="w-full p-3 rounded bg-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option>Select State</option>

                  {states.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.state_name}
                    </option>
                  ))}
                </select>

                <select
                  name="city"
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option>Select City</option>

                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.city_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* DOCUMENT SECTION */}

              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-indigo-400">
                  Documents
                </h3>

                {documents.map((doc, index) => (
                  <div key={index} className="mb-5 bg-slate-700 p-4 rounded-lg">
                    <select
                      name="document_type"
                      onChange={(e) => handleDocChange(e, index)}
                      className="w-full p-2 mb-2 rounded bg-slate-600"
                    >
                      <option>Select Document</option>
                      <option>Aadhar</option>
                      <option>PAN</option>
                      <option>License</option>
                    </select>

                    <input
                      name="document_number"
                      placeholder="Document Number"
                      onChange={(e) => handleDocChange(e, index)}
                      className="w-full p-2 mb-2 rounded bg-slate-600"
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
                  className="w-full bg-indigo-600 hover:bg-indigo-700 transition p-2 rounded-lg"
                >
                  + Add Document
                </button>
              </div>

              {/* SAVE BUTTON */}

              <div className="col-span-3 pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition transform p-4 rounded-xl font-semibold text-lg"
                >
                  Save Venue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= VIEW ================= */}

      {viewData && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-slate-800 p-8 rounded w-[800px] max-h-[90vh] overflow-y-auto">
            {/* Header */}

            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">View Venue</h2>

              <button onClick={closeModal}>
                <X className="text-white" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Venue Image */}

              <div className="col-span-2">
                <label className="text-sm text-slate-400">Venue Image</label>

                <img
                  src={viewData.venue.venue_image}
                  className="w-full h-60 object-cover rounded mt-2"
                />
              </div>

              {/* Venue Name */}

              <div>
                <label className="text-sm text-slate-400">Venue Name</label>

                <input
                  type="text"
                  value={viewData.venue.venue_name}
                  disabled
                  className="w-full mt-1 p-2 bg-slate-700 text-white rounded"
                />
              </div>

              {/* Venue Code */}

              <div>
                <label className="text-sm text-slate-400">Venue Code</label>

                <input
                  type="text"
                  value={viewData.venue.venue_code}
                  disabled
                  className="w-full mt-1 p-2 bg-slate-700 text-white rounded"
                />
              </div>

              {/* Address */}

              <div className="col-span-2">
                <label className="text-sm text-slate-400">Address</label>

                <textarea
                  value={viewData.venue.address}
                  disabled
                  className="w-full mt-1 p-2 bg-slate-700 text-white rounded"
                />
              </div>

              {/* Country */}

              <div>
                <label className="text-sm text-slate-400">Country</label>

                <input
                  type="text"
                  value={viewData.venue.country_name}
                  disabled
                  className="w-full mt-1 p-2 bg-slate-700 text-white rounded"
                />
              </div>

              {/* State */}

              <div>
                <label className="text-sm text-slate-400">State</label>

                <input
                  type="text"
                  value={viewData.venue.state_name}
                  disabled
                  className="w-full mt-1 p-2 bg-slate-700 text-white rounded"
                />
              </div>

              {/* City */}

              <div>
                <label className="text-sm text-slate-400">City</label>

                <input
                  type="text"
                  value={viewData.venue.city_name}
                  disabled
                  className="w-full mt-1 p-2 bg-slate-700 text-white rounded"
                />
              </div>

              {/* Status */}

              <div>
                <label className="text-sm text-slate-400">Status</label>

                <input
                  type="text"
                  value={viewData.venue.status}
                  disabled
                  className="w-full mt-1 p-2 bg-slate-700 text-white rounded"
                />
              </div>
            </div>

            {/* Documents */}
          </div>
        </div>
      )}
    </div>
  );
};
