import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Plus, X, CheckCircle, AlertCircle } from "lucide-react";
import {
  getVenueDetails,
  createVenue,
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

      setVenues(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error("Error loading venues:", error);
      setVenues([]);
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

    await createVenue({
      ...form,
      documents: documents.filter((d) => d.document_type && d.document_number),
    });

    showToast("✓ Venue Created Successfully!", "success");

    setShowForm(false);

    loadVenues();
  };

  // ================= VIEW =================

  const viewVenue = async (id) => {
    const res = await getVenueDetails(id);

    setViewData(res);
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
    <div className="p-10 text-slate-800 bg-sky-50 min-h-screen w-full">
      {/* TOAST NOTIFICATION */}

      {toast && (
        <div
          className={`fixed top-5 right-5 flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl z-[9999] animate-in fade-in slide-in-from-top ${
            toast.type === "success"
              ? "bg-sky-600 border border-sky-500"
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
        <h1 className="text-3xl font-bold text-sky-900">Venue Management</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-sky-600 px-4 py-2 rounded text-white flex gap-2 items-center hover:bg-sky-700 transition shadow-lg"
        >
          <Plus size={18} />
          Add Venue
        </button>
      </div>

      <input
        placeholder="Search Venue..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-6 p-3 rounded bg-white text-slate-800 placeholder-slate-400 border border-sky-200 focus:ring-2 focus:ring-sky-500 outline-none shadow-sm"
      />

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow-md border border-sky-100 overflow-hidden">
        <table className="w-full">
          <thead>
           <tr
  className="text-left text-white"
  style={{ backgroundColor: "#5ed6eeff" }}
>
              <th className="p-4 font-semibold">Action</th>
              <th className="p-4 font-semibold">Code</th>
              <th className="p-4 font-semibold">Venue</th>
              <th className="p-4 font-semibold">Address</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-sky-50">
            {filteredVenues.map((v) => (
              <tr key={v.id} className="hover:bg-sky-50 transition-colors">
                <td className="p-4">
                  <button
                    onClick={() => viewVenue(v.id)}
                    className="text-sky-600 hover:text-sky-800 transition-colors"
                  >
                    <Eye size={20} />
                  </button>
                </td>

                <td className="p-4 font-medium text-sky-900">{v.venue_code}</td>

                <td className="p-4 text-slate-700">{v.venue_name}</td>

                <td className="p-4 text-slate-600">{v.address}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      v.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {v.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= CREATE MODAL ================= */}

      {showForm && (
        <div className="fixed inset-0 bg-sky-900/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white border border-sky-100 shadow-2xl rounded-2xl w-[1000px] max-h-[90vh] overflow-y-auto">
            {/* HEADER */}

            <div
  className="flex justify-between items-center px-8 py-5 border-b border-sky-100 rounded-t-2xl"
  style={{ backgroundColor: "#5ed6eeff" }}  // sky-600 color
>
              <h2 className="text-2xl font-semibold text-white">
                Create Venue
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="text-white hover:text-sky-100 transition"
              >
                <X size={28} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-8 grid grid-cols-3 gap-8"
            >
              {/* IMAGE UPLOAD */}

              <div className="bg-sky-50 p-6 rounded-xl border border-sky-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-sky-700">
                  Venue Image
                </h3>

                <label className="flex flex-col items-center justify-center border-2 border-dashed border-sky-200 rounded-lg p-6 cursor-pointer hover:border-sky-400 transition bg-white">
                  <span className="text-sky-400 mb-2">Upload Image</span>

                  <input
                    type="file"
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>

                {imagePreview && (
                  <img
                    src={imagePreview}
                    className="mt-4 rounded-lg h-40 w-full object-cover border border-sky-100 shadow-sm"
                  />
                )}
              </div>

              {/* LOCATION DETAILS */}

              <div className="bg-sky-50 p-6 rounded-xl border border-sky-100 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-sky-700">
                  Location Details
                </h3>

                <input
                  name="venue_name"
                  placeholder="Venue Name"
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-white border border-sky-200 focus:ring-2 focus:ring-sky-500 outline-none text-slate-700"
                />

                <textarea
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-white border border-sky-200 focus:ring-2 focus:ring-sky-500 outline-none text-slate-700"
                />

                <select
                  name="country"
                  onChange={(e) => {
                    handleChange(e);
                    loadStates(e.target.value);
                  }}
                  className="w-full p-3 rounded bg-white border border-sky-200 focus:ring-2 focus:ring-sky-500 outline-none text-slate-700"
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
                  className="w-full p-3 rounded bg-white border border-sky-200 focus:ring-2 focus:ring-sky-500 outline-none text-slate-700"
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
                  className="w-full p-3 rounded bg-white border border-sky-200 focus:ring-2 focus:ring-sky-500 outline-none text-slate-700"
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

              <div className="bg-sky-50 p-6 rounded-xl border border-sky-100 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-sky-700">
                  Documents
                </h3>

                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="mb-5 bg-white p-4 rounded-lg border border-sky-100"
                  >
                    <select
                      name="document_type"
                      onChange={(e) => handleDocChange(e, index)}
                      className="w-full p-2 mb-2 rounded bg-sky-50 border border-sky-100 text-slate-700"
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
                      className="w-full p-2 mb-2 rounded bg-sky-50 border border-sky-100 text-slate-700"
                    />

                    <input
                      type="file"
                      onChange={(e) => handleDocument(e, index)}
                      className="text-sm text-sky-600"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addDocument}
                  className="w-full bg-sky-100 text-sky-700 hover:bg-sky-200 transition p-2 rounded-lg font-medium"
                >
                  + Add Document
                </button>
              </div>

              {/* SAVE BUTTON */}

              <div className="col-span-3 pt-4">
                <button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white transition transform hover:scale-[1.01] p-4 rounded-xl font-semibold text-lg shadow-lg"
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
        <div className="fixed inset-0 bg-sky-900/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl w-[800px] max-h-[90vh] overflow-y-auto shadow-2xl border border-sky-100">
            {/* Header */}

            <div className="flex justify-between items-center mb-6 border-b border-sky-100 pb-4">
              <h2 className="text-2xl font-bold text-sky-900">View Venue</h2>

              <button
                onClick={closeModal}
                className="text-sky-400 hover:text-sky-600 transition"
              >
                <X size={28} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Venue Image */}

              <div className="col-span-2 bg-sky-50 p-4 rounded-xl border border-sky-100">
                <label className="text-sm font-semibold text-sky-700">
                  Venue Image
                </label>

                <img
                  src={viewData.venue.venue_image}
                  className="w-full h-64 object-cover rounded-lg mt-2 shadow-sm border border-white"
                />
              </div>

              {/* Venue Name */}

              <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                <label className="text-sm font-semibold text-sky-700">
                  Venue Name
                </label>

                <div className="mt-1 p-3 bg-white border border-sky-200 text-slate-800 rounded-lg shadow-sm">
                  {viewData.venue.venue_name}
                </div>
              </div>

              {/* Venue Code */}

              <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                <label className="text-sm font-semibold text-sky-700">
                  Venue Code
                </label>

                <div className="mt-1 p-3 bg-white border border-sky-200 text-slate-800 rounded-lg shadow-sm">
                  {viewData.venue.venue_code}
                </div>
              </div>

              {/* Address */}

              <div className="col-span-2 bg-sky-50 p-4 rounded-xl border border-sky-100">
                <label className="text-sm font-semibold text-sky-700">
                  Address
                </label>

                <div className="mt-1 p-3 bg-white border border-sky-200 text-slate-800 rounded-lg shadow-sm min-h-[80px]">
                  {viewData.venue.address}
                </div>
              </div>

              {/* Country */}

              <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                <label className="text-sm font-semibold text-sky-700">
                  Country
                </label>

                <div className="mt-1 p-3 bg-white border border-sky-200 text-slate-800 rounded-lg shadow-sm">
                  {viewData.venue.country_name}
                </div>
              </div>

              {/* State */}

              <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                <label className="text-sm font-semibold text-sky-700">
                  State
                </label>

                <div className="mt-1 p-3 bg-white border border-sky-200 text-slate-800 rounded-lg shadow-sm">
                  {viewData.venue.state_name}
                </div>
              </div>

              {/* City */}

              <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                <label className="text-sm font-semibold text-sky-700">
                  City
                </label>

                <div className="mt-1 p-3 bg-white border border-sky-200 text-slate-800 rounded-lg shadow-sm">
                  {viewData.venue.city_name}
                </div>
              </div>

              {/* Status */}

              <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                <label className="text-sm font-semibold text-sky-700">
                  Status
                </label>

                <div className="mt-1">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                      viewData.venue.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {viewData.venue.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Documents */}
          </div>
        </div>
      )}
    </div>
  );
};
