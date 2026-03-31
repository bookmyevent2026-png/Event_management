import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Plus, X, CheckCircle, AlertCircle } from "lucide-react";

import { getVendors, createVendor, getVendorById } from "../../Services/api";

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
    const res = await getVendors();

    console.log(res); // 🔥 check this once

    setVendors(Array.isArray(res) ? res : res.data || []);
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

    await createVendor({
      ...form,
      documents,
    });

    showToast("✓ Vendor Created Successfully!", "success");

    setShowForm(false);

    loadVendors();
  };

  // ================= VIEW =================

  const viewVendor = async (id) => {
    const res = await getVendorById(id);

    setViewData(res);
  };

  const closeModal = () => {
    setViewData(null);
  };

  // ================= SEARCH =================

  const filteredVendors = vendors.filter(
    (v) =>
      (v.vendor_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.company_name || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-10 text-slate-800 bg-sky-50 min-h-screen w-full">
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

      {/* HEADER */}

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-sky-900">Vendor Management</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-sky-600 px-4 py-2 rounded text-white flex gap-2 items-center hover:bg-sky-700 transition shadow-lg"
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
        className="w-full mb-6 p-3 rounded bg-white text-slate-800 placeholder-slate-400 border border-sky-200 focus:ring-2 focus:ring-sky-500 outline-none shadow-sm"
      />

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow-md border border-sky-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr
  className="text-left text-white"
  style={{ backgroundColor: "#547d8fff" }}
>
              <th className="p-4 font-semibold">Action</th>
              <th className="p-4 font-semibold">Vendor Name</th>
              <th className="p-4 font-semibold">Primary Contact</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Address</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-sky-50">
            {filteredVendors.map((v) => (
              <tr key={v.id} className="hover:bg-sky-50 transition-colors">
                <td className="p-4">
                  <button
                    onClick={() => viewVendor(v.id)}
                    className="text-sky-600 hover:text-sky-800 transition-colors"
                  >
                    <Eye size={20} />
                  </button>
                </td>

                <td className="p-4 font-medium text-sky-900">
                  {v.vendor_name}
                </td>
                <td className="p-4 text-slate-700">{v.primary_contact}</td>
                <td className="p-4 text-slate-600">{v.mail_id}</td>
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
          <div className="bg-white w-[95%] max-w-[1400px] h-[95vh] rounded-2xl shadow-2xl flex flex-col border border-sky-100">
            {/* HEADER */}
            <div className="flex justify-between items-center px-8 py-5 border-b border-sky-100 bg-sky-600 rounded-t-2xl">
              <h2 className="text-2xl font-semibold text-white">
                Create Vendor
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-white hover:text-sky-100 transition"
              >
                <X size={28} />
              </button>
            </div>

            {/* BODY */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-8"
            >
              <div className="grid grid-cols-3 gap-8">
                {/* ------------------ Vendor Information ------------------ */}
                <div className="border border-sky-100 rounded-xl p-6 bg-sky-50 shadow-sm">
                  <h3 className="text-sky-700 font-bold mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-sky-600 rounded-full"></span>
                    Vendor Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-sky-800 mb-1">
                        Vendor Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="vendor_type"
                        onChange={handleChange}
                        className="w-full border border-sky-200 p-2 rounded bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                        required
                      >
                        <option value="">Select Vendor Type</option>
                        <option>Suppliers</option>
                        <option>Contractors</option>
                        <option>Distributors</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-sky-800 mb-1">
                        Vendor Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="vendor_name"
                        placeholder="Enter Vendor Name"
                        onChange={handleChange}
                        className="w-full border border-sky-200 p-2 rounded bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-sky-800 mb-1">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="company_name"
                        placeholder="Enter Company Name"
                        onChange={handleChange}
                        className="w-full border border-sky-200 p-2 rounded bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-sky-800 mb-1">
                        Primary Contact No{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="primary_contact"
                        placeholder="Enter Primary Contact"
                        onChange={handleChange}
                        className="w-full border border-sky-200 p-2 rounded bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-sky-800 mb-1">
                        Secondary Contact No (Optional)
                      </label>
                      <input
                        name="secondary_contact"
                        placeholder="Enter Secondary Contact"
                        onChange={handleChange}
                        className="w-full border border-sky-200 p-2 rounded bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-sky-800 mb-1">
                        Mail ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="mail_id"
                        placeholder="Enter Mail ID"
                        onChange={handleChange}
                        className="w-full border border-sky-200 p-2 rounded bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-sky-800 mb-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="address"
                        placeholder="Enter Full Address"
                        onChange={handleChange}
                        className="w-full border border-sky-200 p-2 rounded bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* ------------------ Account Details ------------------ */}
                <div className="border border-sky-100 rounded-xl p-6 bg-sky-50 shadow-sm">
                  <h3 className="text-sky-700 font-bold mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-sky-600 rounded-full"></span>
                    Account Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-sky-800 mb-1">
                        Account Holder Name{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="account_holder"
                        placeholder="Enter Account Holder Name"
                        onChange={handleChange}
                        className="w-full border border-sky-200 p-2 rounded bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-sky-800 mb-1">
                        Bank Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="bank_name"
                        placeholder="Enter Bank Name"
                        onChange={handleChange}
                        className="w-full border border-sky-200 p-2 rounded bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-sky-800 mb-1">
                        Account Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="account_number"
                        placeholder="Enter Account Number"
                        onChange={handleChange}
                        className="w-full border border-sky-200 p-2 rounded bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-sky-800 mb-1">
                        IFSC / SWIFT Code{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="ifsc_code"
                        placeholder="Enter IFSC Code"
                        onChange={handleChange}
                        className="w-full border border-sky-200 p-2 rounded bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                        required
                      />
                    </div>

                    {/* Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-sky-800 mb-1">
                        Passbook/Cheque Upload
                      </label>
                      <div className="border-dashed border-2 border-sky-200 rounded-xl p-8 text-center text-sky-400 bg-white hover:bg-sky-50 transition cursor-pointer">
                        <Plus className="mx-auto mb-2" />
                        Upload Document
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full border border-sky-500 text-sky-600 px-4 py-3 rounded-xl hover:bg-sky-600 hover:text-white transition font-semibold shadow-sm"
                    >
                      + Add Attachment
                    </button>
                  </div>
                </div>

                {/* ------------------ Document Details ------------------ */}
                <div className="border border-sky-100 rounded-xl p-6 bg-sky-50 shadow-sm">
                  <h3 className="text-sky-700 font-bold mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-sky-600 rounded-full"></span>
                    Document Details (Optional)
                  </h3>

                  <div className="space-y-6">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="space-y-4 p-4 border border-sky-200 rounded-xl bg-white shadow-sm"
                      >
                        <div>
                          <label className="block text-xs font-bold text-sky-600 mb-1 uppercase tracking-wider">
                            Document Type
                          </label>
                          <select
                            onChange={(e) => handleDocChange(e, index)}
                            className="w-full border border-sky-100 p-2 rounded bg-sky-50 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                          >
                            <option>Select Document Type</option>
                            <option>PAN</option>
                            <option>Aadhar</option>
                            <option>GST</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-sky-600 mb-1 uppercase tracking-wider">
                            Document Number
                          </label>
                          <input
                            placeholder="Enter Document Number"
                            onChange={(e) => handleDocChange(e, index)}
                            className="w-full border border-sky-100 p-2 rounded bg-sky-50 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-sky-600 mb-1 uppercase tracking-wider">
                            Upload File
                          </label>
                          <input
                            type="file"
                            onChange={(e) => handleDocument(e, index)}
                            className="w-full text-xs text-sky-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 transition"
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addDocument}
                      className="w-full border border-sky-500 text-sky-600 px-4 py-3 rounded-xl hover:bg-sky-600 hover:text-white transition font-semibold shadow-sm"
                    >
                      + Add Another Document
                    </button>
                  </div>
                </div>
              </div>

              {/* SUBMIT */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-3 border border-sky-200 rounded-xl text-sky-700 font-semibold hover:bg-sky-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-sky-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-sky-700 transition shadow-lg transform hover:scale-[1.02]"
                >
                  Save Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= VIEW MODAL ================= */}

      {viewData && (
        <div className="fixed inset-0 bg-sky-900/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white w-[600px] p-8 rounded-2xl shadow-2xl border border-sky-100">
            <div className="flex justify-between items-center mb-6 border-b border-sky-100 pb-4">
              <h2 className="text-2xl font-bold text-sky-900">
                Vendor Details
              </h2>

              <button
                onClick={closeModal}
                className="text-sky-400 hover:text-sky-600 transition"
              >
                <X size={28} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                <label className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  Vendor Name
                </label>
                <p className="text-lg font-semibold text-slate-800">
                  {viewData.vendor_name}
                </p>
              </div>

              <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                <label className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  Company
                </label>
                <p className="text-lg font-semibold text-slate-800">
                  {viewData.company_name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                  <label className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                    Contact
                  </label>
                  <p className="font-semibold text-slate-800">
                    {viewData.primary_contact}
                  </p>
                </div>
                <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                  <label className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                    Status
                  </label>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                        viewData.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {viewData.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                <label className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  Email
                </label>
                <p className="font-semibold text-slate-800">
                  {viewData.mail_id}
                </p>
              </div>

              <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                <label className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  Address
                </label>
                <p className="text-slate-700">{viewData.address}</p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={closeModal}
                className="w-full bg-sky-600 text-white py-3 rounded-xl font-bold hover:bg-sky-700 transition shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
