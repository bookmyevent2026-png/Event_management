import React, { useEffect, useState } from "react";
import { getPolicies } from "../../../../Services/api";

const Step5Terms = ({ formData, setFormData }) => {

  const [policyData, setPolicyData] = useState({});

  const [policyGroup, setPolicyGroup] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [policyName, setPolicyName] = useState("");

  // 🔥 Load from service
  useEffect(() => {
    const fetchPolicies = async () => {
      const data = await getPolicies();
      setPolicyData(data || {});
    };
    fetchPolicies();
  }, []);

  const addPolicy = () => {
    if (!policyGroup || !policyType || !policyName) return;

    const newPolicy = {
      policyGroup,
      policyType,
      policyName
    };

    setFormData({
      ...formData,
      terms: [...formData.terms, newPolicy]
    });

    setPolicyGroup("");
    setPolicyType("");
    setPolicyName("");
  };

  return (
    <div className="grid grid-cols-2 gap-6">

      {/* LEFT */}
      <div className="border rounded p-6">

        <h2 className="text-blue-600 text-lg font-semibold mb-4">
          Terms & Conditions
        </h2>

        {/* GROUP */}
        <select
          value={policyGroup}
          onChange={(e) => {
            setPolicyGroup(e.target.value);
            setPolicyType("");
            setPolicyName("");
          }}
          className="border p-2 w-full mb-3"
        >
          <option value="">Select Group</option>
          {Object.keys(policyData).map((group) => (
            <option key={group}>{group}</option>
          ))}
        </select>

        {/* TYPE */}
        <select
          value={policyType}
          onChange={(e) => {
            setPolicyType(e.target.value);
            setPolicyName("");
          }}
          className="border p-2 w-full mb-3"
        >
          <option value="">Select Type</option>
          {policyGroup &&
            Object.keys(policyData[policyGroup] || {}).map((type) => (
              <option key={type}>{type}</option>
            ))}
        </select>

        {/* NAME */}
        <select
          value={policyName}
          onChange={(e) => setPolicyName(e.target.value)}
          className="border p-2 w-full mb-3"
        >
          <option value="">Select Policy</option>
          {policyGroup && policyType &&
            (policyData[policyGroup][policyType] || []).map((name, i) => (
              <option key={i}>{name}</option>
            ))}
        </select>

        <button
          onClick={addPolicy}
          className="border border-blue-500 text-blue-600 px-5 py-2 rounded"
        >
          Add
        </button>

      </div>

      {/* RIGHT */}
      <div className="border rounded p-6">

        <h2 className="text-blue-600 text-lg font-semibold mb-4">
          Preview
        </h2>

        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Group</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Name</th>
            </tr>
          </thead>

          <tbody>
            {formData.terms.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-400">
                  No Data Found
                </td>
              </tr>
            )}

            {formData.terms.map((p, i) => (
              <tr key={i}>
                <td className="border p-2">{p.policyGroup}</td>
                <td className="border p-2">{p.policyType}</td>
                <td className="border p-2">{p.policyName}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Step5Terms;