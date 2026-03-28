import { useState, useEffect } from "react";
import axios from "axios";
import { X, Eye, Plus, MapPin, FileText, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { getVenues, getCountries, getStates, getCities } from "../../Services/api";

export const Venuepage = () => {
  const [venues, setVenues] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

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

  const loadVenues = async () => {
    try {
      const res = await getVenues()
      setVenues(res.data);
    } catch (error) {
      console.error("Error loading venues:", error);
    }
  };

  const loadCountries = async () => {
    try {
      const res = await getCountries();
      setCountries(res.data);
    } catch (error) {
      console.error("Error loading countries:", error);
    }
  };

  const loadStates = async (id) => {
    try {
      const res = await getStates(id);
      setStates(res.data);
    } catch (error) {
      console.error("Error loading states:", error);
    }
  };

  const loadCities = async (id) => {
    try {
      const res = await getCities(id);
      setCities(res.data);
    } catch (error) {
      console.error("Error loading cities:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
      setForm({ ...form, venue_image: reader.result });
    };
  };

  const handleDocument = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let temp = [...documents];
      temp[index].document_file = reader.result;
      temp[index].preview = reader.result;
      setDocuments(temp);
    };
  };

  const handleDocChange = (e, index) => {
    let temp = [...documents];
    temp[index][e.target.name] = e.target.value;
    setDocuments(temp);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/superadmin/api/create_venue", {
        ...form,
        documents: documents.filter(d => d.document_type && d.document_number),
      });
      alert("Venue Created Successfully!");
      setShowForm(false);
      setForm({
        venue_name: "",
        address: "",
        country: "",
        state: "",
        city: "",
        status: "Active",
        venue_image: "",
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
      loadVenues();
    } catch (error) {
      alert("Error creating venue: " + error.message);
    }
  };

  const viewVenue = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/venue/${id}`);
      setViewData(res.data);
      setSelectedImageIndex(0);
    } catch (error) {
      console.error("Error loading venue:", error);
    }
  };

  const closeModal = () => {
    setViewData(null);
    setSelectedImageIndex(0);
  };

  const filteredVenues = venues.filter(v =>
    v.venue_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.venue_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Venue Management</h1>
            <p className="text-slate-400 text-sm mt-1">Manage and organize your event venues</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
          >
            <Plus size={20} />
            Add Venue
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by venue name, code, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Venues Table */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-b border-slate-700/50">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-slate-300 w-20">
                    Action
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-slate-300">
                    Venue Code
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-slate-300">
                    Venue Name
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-slate-300">
                    Address
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-slate-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredVenues.length > 0 ? (
                  filteredVenues.map((v, idx) => (
                    <tr
                      key={v.id}
                      className="border-t border-slate-700/30 hover:bg-slate-700/30 transition-colors duration-200"
                    >
                      <td className="px-8 py-4">
                        <button
                          onClick={() => viewVenue(v.id)}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-blue-300 transition-all duration-200 group"
                          title="View details"
                        >
                          <Eye size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                      </td>
                      <td className="px-8 py-4 text-sm font-semibold text-blue-400">
                        {v.venue_code}
                      </td>
                      <td className="px-8 py-4 text-sm text-white font-medium">
                        {v.venue_name}
                      </td>
                      <td className="px-8 py-4 text-sm text-slate-300 max-w-xs truncate">
                        {v.address}
                      </td>
                      <td className="px-8 py-4">
                        <span
                          className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${
                            v.status === "Active"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-8 py-12 text-center text-slate-400">
                      No venues found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Venue Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 px-8 py-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Create New Venue</h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-3 gap-8">
                {/* Venue Information */}
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <Camera size={20} className="text-blue-400" />
                    Venue Image
                  </h3>

                  <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center mb-4 hover:border-blue-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      className="hidden"
                      id="venue-image"
                    />
                    <label htmlFor="venue-image" className="cursor-pointer block">
                      <Camera className="mx-auto mb-2 text-slate-400" size={32} />
                      <p className="text-sm text-slate-400">Click to upload image</p>
                    </label>
                  </div>

                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 rounded-lg object-cover border border-slate-600 mb-4"
                    />
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Venue Name *
                      </label>
                      <input
                        type="text"
                        name="venue_name"
                        placeholder="Enter venue name"
                        value={form.venue_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Location Details */}
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <MapPin size={20} className="text-blue-400" />
                    Location Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Address *
                      </label>
                      <textarea
                        name="address"
                        placeholder="Enter venue address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 h-20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={form.country}
                        onChange={(e) => {
                          handleChange(e);
                          loadStates(e.target.value);
                        }}
                        required
                        className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.country_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        State *
                      </label>
                      <select
                        name="state"
                        value={form.state}
                        onChange={(e) => {
                          handleChange(e);
                          loadCities(e.target.value);
                        }}
                        required
                        className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select State</option>
                        {states.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.state_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        City *
                      </label>
                      <select
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select City</option>
                        {cities.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.city_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Document Details */}
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <FileText size={20} className="text-blue-400" />
                    Documents
                  </h3>

                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="bg-slate-700/30 border border-slate-600 rounded-lg p-4"
                      >
                        <select
                          name="document_type"
                          value={doc.document_type}
                          onChange={(e) => handleDocChange(e, index)}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded text-white text-sm mb-2 focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Select Document</option>
                          <option>Aadhar Card</option>
                          <option>PAN Card</option>
                          <option>License</option>
                          <option>Certificate</option>
                        </select>

                        <input
                          type="text"
                          name="document_number"
                          placeholder="Document Number"
                          value={doc.document_number}
                          onChange={(e) => handleDocChange(e, index)}
                          className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded text-white text-sm mb-2 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />

                        <input
                          type="file"
                          onChange={(e) => handleDocument(e, index)}
                          className="w-full text-sm text-slate-400 mb-2"
                        />

                        {doc.preview && (
                          <img
                            src={doc.preview}
                            alt="Doc preview"
                            className="w-full h-16 rounded object-cover border border-slate-600"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addDocument}
                    className="w-full mt-4 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors text-sm font-semibold"
                  >
                    + Add Document
                  </button>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 mt-8 pt-8 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-3 bg-slate-700 text-slate-300 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-600 transition-all shadow-lg hover:shadow-green-500/50"
                >
                  Save Venue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Venue Modal */}
      {viewData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 px-8 py-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {viewData.venue.venue_name}
                </h2>
                <p className="text-blue-400 text-sm mt-1">
                  {viewData.venue.venue_code}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Venue Image */}
              {viewData.venue.venue_image && (
                <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900/50">
                  <img
                    src={viewData.venue.venue_image}
                    alt={viewData.venue.venue_name}
                    className="w-full h-80 object-cover"
                  />
                </div>
              )}

              {/* Venue Information */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-700/30 border border-slate-600 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Address</h3>
                  <p className="text-white">{viewData.venue.address}</p>
                </div>
                <div className="bg-slate-700/30 border border-slate-600 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Status</h3>
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                      viewData.venue.status === "Active"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {viewData.venue.status}
                  </span>
                </div>
              </div>

              {/* Documents Section */}
              {viewData.documents && viewData.documents.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <FileText size={24} className="text-blue-400" />
                    Documents
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    {viewData.documents.map((doc, idx) => (
                      <div
                        key={doc.id}
                        className="bg-slate-700/30 border border-slate-600 rounded-xl p-6 hover:border-blue-500 transition-colors"
                      >
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-slate-400 mb-1">
                            Document Type
                          </h4>
                          <p className="text-white font-semibold">
                            {doc.document_type}
                          </p>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-slate-400 mb-1">
                            Document Number
                          </h4>
                          <p className="text-blue-400 font-mono">
                            {doc.document_number}
                          </p>
                        </div>

                        {doc.document_file && (
                          <img
                            src={doc.document_file}
                            alt={doc.document_type}
                            className="w-full h-40 rounded-lg object-cover border border-slate-600"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};