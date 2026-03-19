import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, Plus, X, CheckCircle } from "lucide-react";

export const PolicyPage = () => {

  const [policies, setPolicies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [viewData, setViewData] = useState(null);

  const [form, setForm] = useState({
    policy_name: "",
    policy_type: "",
    policy_group: "",
    description: "",
    status: "Active",
  });

  // ================= LOAD =================

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    const res = await axios.get("http://localhost:5000/superadmin/api/policies");
    setPolicies(res.data);
  };

  // ================= FORM =================

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SAVE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/superadmin/api/create_policy", form);

    setShowForm(false);
    loadPolicies();
  };

  // ================= VIEW =================

  const viewPolicy = async (id) => {
    const res = await axios.get(`http://localhost:5000/superadmin/api/policy/${id}`);
    setViewData(res.data);
  };

  return (
    <div className="p-10" style={{ background: "#acbdc7", minHeight: "100%" }}>

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Policy Management</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-sky-500 px-4 py-2 rounded flex gap-2 items-center"
        >
          <Plus size={18} />
          Add Policy
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">

  <div className="overflow-x-auto">

    <table className="w-full">

      {/* HEADER */}
      <thead className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-b border-slate-700/50">
        <tr>

          <th className="px-8 py-4 text-left text-sm font-semibold text-slate-300 w-20">
            Action
          </th>

          <th className="px-8 py-4 text-left text-sm font-semibold text-slate-300">
            Policy Code
          </th>

          <th className="px-8 py-4 text-left text-sm font-semibold text-slate-300">
            Policy Name
          </th>

          <th className="px-8 py-4 text-left text-sm font-semibold text-slate-300">
            Policy Type
          </th>

          <th className="px-8 py-4 text-left text-sm font-semibold text-slate-300">
            Policy Group
          </th>

          <th className="px-8 py-4 text-left text-sm font-semibold text-slate-300">
            Status
          </th>

        </tr>
      </thead>

      {/* BODY */}
      <tbody>

        {policies.length > 0 ? (
          policies.map((p) => (

            <tr
              key={p.id}
              className="border-t border-slate-700/30 hover:bg-slate-700/30 transition-colors duration-200"
            >

              {/* ACTION */}
              <td className="px-8 py-4">
                <button
                  onClick={() => viewPolicy(p.id)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-blue-300 transition-all duration-200 group"
                  title="View policy"
                >
                  <Eye size={18} className="group-hover:scale-110 transition-transform" />
                </button>
              </td>

              {/* CODE */}
              <td className="px-8 py-4 text-sm font-semibold text-blue-400">
                {p.policy_code}
              </td>

              {/* NAME */}
              <td className="px-8 py-4 text-sm text-white font-medium">
                {p.policy_name}
              </td>

              {/* TYPE */}
              <td className="px-8 py-4 text-sm text-slate-300">
                {p.policy_type}
              </td>

              {/* GROUP */}
              <td className="px-8 py-4 text-sm text-slate-300">
                {p.policy_group}
              </td>

              {/* STATUS */}
              <td className="px-8 py-4">
                <span
                  className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${
                    p.status === "Active"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {p.status}
                </span>
              </td>

            </tr>

          ))
        ) : (

          <tr>
            <td colSpan="6" className="px-8 py-12 text-center text-slate-400">
              No policies found
            </td>
          </tr>

        )}

      </tbody>

    </table>

  </div>

</div>

      {/* ================= CREATE MODAL ================= */}

      {showForm && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">

    <div className="w-[950px] bg-white rounded-2xl shadow-2xl overflow-hidden">

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
        <h2 className="text-lg font-semibold tracking-wide">
          Create Policy
        </h2>
        <button
          onClick={() => setShowForm(false)}
          className="hover:bg-white/20 p-2 rounded-full transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* BODY */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">

        {/* POLICY INFO */}
        <div className="grid grid-cols-2 gap-6">

          {/* POLICY NAME */}
          <div className="relative">
            <label className="text-sm text-gray-600">
              Policy Name *
            </label>
            <input
              name="policy_name"
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter Policy Name"
              required
            />
          </div>

          {/* POLICY TYPE */}
          <div>
            <label className="text-sm text-gray-600">
              Policy Type *
            </label>
            <select
              name="policy_type"
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            >
              <option value="">Select Type</option>
              <option>Exhibitor</option>
              <option>Visitor</option>
              <option>Vendor</option>
            </select>
          </div>

          {/* POLICY GROUP */}
          <div className="col-span-2">
            <label className="text-sm text-gray-600">
              Policy Group
            </label>
            <select
              name="policy_group"
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select Group</option>
              <option>Cancellation Policy</option>
              <option>Refund Policy</option>
              <option>Safety Policy</option>
              <option>Privacy Policy</option>
              <option>Payment Policy</option>
            </select>
          </div>

        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Policy Description
          </label>

          <textarea
            name="description"
            onChange={handleChange}
            rows="6"
            placeholder="Write detailed policy here..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          />
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 pt-4 border-t">

          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md hover:scale-105 transition"
          >
            Save Policy
          </button>

        </div>

      </form>
    </div>
  </div>
)}

      {/* ================= VIEW MODAL ================= */}

      {viewData && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

          <div className="bg-white w-[700px] p-6 rounded">

            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Policy Details</h2>
              <button onClick={() => setViewData(null)}>
                <X />
              </button>
            </div>

            <div className="space-y-3">
              <p><b>Name:</b> {viewData.policy_name}</p>
              <p><b>Type:</b> {viewData.policy_type}</p>
              <p><b>Group:</b> {viewData.policy_group}</p>
              <p><b>Status:</b> {viewData.status}</p>
              <p><b>Description:</b> {viewData.description}</p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};