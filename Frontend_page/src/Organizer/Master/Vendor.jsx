import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Plus, X , CheckCircle, AlertCircle } from "lucide-react";

export const VendorPage = () => {

  const [vendors, setVendors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [toast, setToast] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    vendor_type: "",
    vendor_name: "",
    company_name: "",
    primary_contact: "",
    secondary_contact: "",
    mail_id: "",
    address: "",
    bank_name: "",
    account_holder: "",
    ifsc_code: "",
    account_number: "",
    status: "Active",
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
    loadVendors();
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
  // ================= LOAD =================

  const loadVendors = async () => {
    const res = await axios.get(
      "http://localhost:5000/superadmin/api/vendors"
    );
    setVendors(res.data);
  };

  // ================= FORM =================

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

    await axios.post(
      "http://localhost:5000/superadmin/api/create_vendor",
      {
        ...form,
        documents,
      }
    );

    showToast("✓ Vendor Created Successfully!", "success");

    setShowForm(false);

    loadVendors();
  };

  // ================= VIEW =================

  const viewVendor = async (id) => {
    const res = await axios.get(
      `http://localhost:5000/superadmin/api/vendor/${id}`
    );

    setViewData(res.data);
  };

  const closeModal = () => {
    setViewData(null);
  };

  // ================= SEARCH =================

  const filteredVendors = vendors.filter(
    (v) =>
      (v.vendor_name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (v.company_name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-10 text-black"style={{  backgroundColor: "#acbdc7",width: "100%", minHeight: "100%"}}>
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

        <h1 className="text-3xl font-bold">
          Vendor Management
        </h1>

        <button
          onClick={() => setShowForm(true)}
           className="bg-sky-500 px-4 py-2 rounded flex gap-2 items-center hover:bg-sky-600 transition"
        >
          <Plus size={18} />
          Add Vendor
        </button>

      </div>

      {/* SEARCH */}

      <input
        placeholder="Search Vendor..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-6 p-3 rounded  text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"style={{ backgroundColor: "#81a2b5" }}
      />

      {/* TABLE */}

     <table className="w-full rounded" style={{ backgroundColor: "#939ea4" }}>

        <thead>
          <tr className="text-left border-b border-slate-700">

            <th className="p-3">Action</th>
            <th className="p-3">Vendor Name</th>
            <th className="p-3">Primary Contact</th>
            <th className="p-3">Email</th>
            <th className="p-3">Address</th>
            <th className="p-3">Status</th>

          </tr>
        </thead>

        <tbody>

          {filteredVendors.map((v) => (

            <tr key={v.id} className="border-b border-slate-700">

              <td className="p-3">

                <button
                  onClick={() => viewVendor(v.id)}
                  className="text-black-400"
                >
                  <Eye />
                </button>

              </td>

              <td className="p-3">{v.vendor_name}</td>
              <td className="p-3">{v.primary_contact}</td>
              <td className="p-3">{v.mail_id}</td>
              <td className="p-3">{v.address}</td>
              <td className="p-3">{v.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* ================= CREATE MODAL ================= */}

      {showForm && (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

          <div className="bg-slate-900 w-[900px] p-8 rounded-xl overflow-y-auto max-h-[90vh]">

            <div className="flex justify-between mb-6">

              <h2 className="text-xl font-bold">
                Create Vendor
              </h2>

              <button onClick={() => setShowForm(false)}>
                <X />
              </button>

            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Vendor Information */}

              <div className="bg-slate-800 p-6 rounded">

                <h3 className="text-indigo-400 font-semibold mb-4">
                  Vendor Information
                </h3>

                <div className="grid grid-cols-2 gap-4">

                  <select
                    name="vendor_type"
                    onChange={handleChange}
                    className="p-3 rounded bg-slate-700"
                    required
                  >
                    <option value="">Vendor Type</option>
                    <option>Suppliers</option>
                    <option>Contractors</option>
                    <option>Distributors</option>
                  </select>

                  <input
                    name="vendor_name"
                    placeholder="Vendor Name"
                    onChange={handleChange}
                    className="p-3 rounded bg-slate-700"
                    required
                  />

                  <input
                    name="company_name"
                    placeholder="Company Name"
                    onChange={handleChange}
                    className="p-3 rounded bg-slate-700"
                    required
                  />

                  <input
                    name="primary_contact"
                    placeholder="Primary Contact"
                    onChange={handleChange}
                    className="p-3 rounded bg-slate-700"
                    required
                  />

                  <input
                    name="secondary_contact"
                    placeholder="Secondary Contact"
                    onChange={handleChange}
                    className="p-3 rounded bg-slate-700"
                  />

                  <input
                    name="mail_id"
                    placeholder="Mail ID"
                    onChange={handleChange}
                    className="p-3 rounded bg-slate-700"
                    required
                  />

                  <textarea
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    className="p-3 rounded bg-slate-700 col-span-2"
                    required
                  />

                </div>

              </div>

              {/* Account Details */}

              <div className="bg-slate-800 p-6 rounded">

                <h3 className="text-indigo-400 font-semibold mb-4">
                  Account Details
                </h3>

                <div className="grid grid-cols-2 gap-4">

                  <input
                    name="bank_name"
                    placeholder="Bank Name"
                    onChange={handleChange}
                    className="p-3 rounded bg-slate-700"
                  />

                  <input
                    name="account_holder"
                    placeholder="Account Holder Name"
                    onChange={handleChange}
                    className="p-3 rounded bg-slate-700"
                  />

                  <input
                    name="ifsc_code"
                    placeholder="IFSC / SWIFT Code"
                    onChange={handleChange}
                    className="p-3 rounded bg-slate-700"
                  />

                  <input
                    name="account_number"
                    placeholder="Account Number"
                    onChange={handleChange}
                    className="p-3 rounded bg-slate-700"
                  />

                </div>

              </div>

              {/* Document Details */}

              <div className="bg-slate-800 p-6 rounded">

                <h3 className="text-indigo-400 font-semibold mb-4">
                  Document Details
                </h3>

                {documents.map((doc, index) => (

                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 mb-4"
                  >

                    <select
                      name="document_type"
                      onChange={(e) => handleDocChange(e, index)}
                      className="p-3 rounded bg-slate-700"
                    >
                      <option>Document Type</option>
                      <option>PAN</option>
                      <option>Aadhar</option>
                      <option>GST</option>
                    </select>

                    <input
                      name="document_number"
                      placeholder="Document Number"
                      onChange={(e) => handleDocChange(e, index)}
                      className="p-3 rounded bg-slate-700"
                    />

                    <input
                      type="file"
                      onChange={(e) => handleDocument(e, index)}
                    />

                  </div>

                ))}

                <button
                  type="button"
                  onClick={addDocument}
                  className="bg-indigo-600 px-4 py-2 rounded"
                >
                  + Add Document
                </button>

              </div>

              <button
                type="submit"
                className="w-full bg-green-600 p-3 rounded"
              >
                Save Vendor
              </button>

            </form>

          </div>

        </div>

      )}

      {/* ================= VIEW MODAL ================= */}

      {viewData && (

        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

          <div className="bg-slate-900 w-[600px] p-8 rounded">

            <div className="flex justify-between mb-4">

              <h2 className="text-xl font-bold">
                Vendor Details
              </h2>

              <button onClick={closeModal}>
                <X />
              </button>

            </div>

            <div className="space-y-2">

              <p><b>Vendor:</b> {viewData.vendor_name}</p>
              <p><b>Company:</b> {viewData.company_name}</p>
              <p><b>Contact:</b> {viewData.primary_contact}</p>
              <p><b>Email:</b> {viewData.mail_id}</p>
              <p><b>Address:</b> {viewData.address}</p>
              <p><b>Status:</b> {viewData.status}</p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};