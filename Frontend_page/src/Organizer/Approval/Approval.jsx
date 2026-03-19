import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { Save, Trash2, Search, Plus, Trash } from "lucide-react";

export const WorkflowPage = () => {

  const [workflows, setWorkflows] = useState([]);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const [workflowName, setWorkflowName] = useState("");
  const [workflowType, setWorkflowType] = useState("");

  const [stages, setStages] = useState([
    { id: Date.now(), stageName: "", primaryUser: "", secondaryUser: "", status: "Active" }
  ]);

  // axios dummy API
  useEffect(() => {

    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {

        const data = res.data.slice(0,5).map((item) => ({
          id: item.id,
          workflowName: item.company.name,
          workflowType: "Sequential",
          status: "Active",
          createdBy: item.username,
          createdOn: "10-03-2026",
          modifiedBy: item.username,
          modifiedOn: "10-03-2026"
        }));

        setWorkflows(data);

      });

  }, []);

  const filtered = workflows.filter((w) =>
    w.workflowName.toLowerCase().includes(search.toLowerCase())
  );

  const addStage = () => {

    setStages([
      ...stages,
      { id: Date.now(), stageName: "", primaryUser: "", secondaryUser: "", status: "Active" }
    ]);

  };

  const removeStage = (id) => {

    if (stages.length > 1) {
      setStages(stages.filter((s) => s.id !== id));
    }

  };

  const handleStageChange = (id, field, value) => {

    setStages(
      stages.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      )
    );

  };

  return (

    <div className="p-8 space-y-6">

      {!showCreate && (

        <>
          {/* HEADER */}

          <div className="flex justify-between items-center">

            <h1 className="text-3xl font-semibold text-gray-700">
              Approval Work Flow Configuration
            </h1>

            <button
              onClick={() => setShowCreate(true)}
              className="bg-white border p-2 rounded shadow hover:bg-gray-100"
            >
              <FaPlus />
            </button>

          </div>

          {/* TABLE */}

          <div className="bg-white p-6 rounded shadow">

            <input
              type="text"
              placeholder="Search Keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-2 rounded w-64 mb-4"
            />

            <table className="w-full border">

              <thead className="bg-gray-200 text-gray-700">

                <tr>
                  <th className="border p-2">Work Flow Name</th>
                  <th className="border p-2">Work Flow Type</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Created By</th>
                  <th className="border p-2">Created On</th>
                  <th className="border p-2">Modified By</th>
                  <th className="border p-2">Modified On</th>
                </tr>

              </thead>

              <tbody>

                {filtered.length === 0 && (

                  <tr>
                    <td colSpan="7" className="text-center p-4">
                      No Data Found.
                    </td>
                  </tr>

                )}

                {filtered.map((w) => (

                  <tr key={w.id}>

                    <td className="border p-2">{w.workflowName}</td>
                    <td className="border p-2">{w.workflowType}</td>
                    <td className="border p-2">{w.status}</td>
                    <td className="border p-2">{w.createdBy}</td>
                    <td className="border p-2">{w.createdOn}</td>
                    <td className="border p-2">{w.modifiedBy}</td>
                    <td className="border p-2">{w.modifiedOn}</td>

                  </tr>

                ))}

              </tbody>

            </table>

            <div className="text-gray-500 mt-3 text-sm">
              Showing {filtered.length} entries
            </div>

          </div>
        </>
      )}

      {/* CREATE PAGE */}

      {showCreate && (

        <>
          <div className="flex justify-end space-x-4">

            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
              <Search size={22} />
            </button>

            <button className="p-2 text-red-600 hover:bg-red-50 rounded">
              <Trash2 size={22} />
            </button>

            <button className="p-2 text-green-600 hover:bg-green-50 rounded">
              <Save size={22} />
            </button>

          </div>

          {/* FORM */}

          <div className="bg-white p-6 rounded shadow grid md:grid-cols-2 gap-6">

            <div>

              <label className="text-sm font-medium">
                Work Flow Name
              </label>

              <select
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option>Standard</option>
                <option>Urgent</option>
              </select>

            </div>

            <div>

              <label className="text-sm font-medium">
                Work Flow Type
              </label>

              <select
                value={workflowType}
                onChange={(e) => setWorkflowType(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option>Sequential</option>
                <option>Parallel</option>
              </select>

            </div>

          </div>

          {/* STAGES */}

          <div className="bg-white p-6 rounded shadow">

            <h2 className="text-lg font-semibold mb-4">
              Work Flow Details
            </h2>

            <table className="w-full border">

              <thead className="bg-gray-200">

                <tr>
                  <th className="border p-2">Action</th>
                  <th className="border p-2">Stage No</th>
                  <th className="border p-2">Stage Name</th>
                  <th className="border p-2">Primary User</th>
                  <th className="border p-2">Secondary User</th>
                  <th className="border p-2">Status</th>
                </tr>

              </thead>

              <tbody>

                {stages.map((stage, index) => (

                  <tr key={stage.id}>

                    <td className="border p-2 flex gap-2">

                      <button onClick={addStage}>
                        <Plus size={18} />
                      </button>

                      <button
                        onClick={() => removeStage(stage.id)}
                        disabled={stages.length === 1}
                      >
                        <Trash size={18} />
                      </button>

                    </td>

                    <td className="border p-2">
                      {index + 1}
                    </td>

                    <td className="border p-2">

                      <input
                        className="border p-1 w-full"
                        value={stage.stageName}
                        onChange={(e) =>
                          handleStageChange(stage.id, "stageName", e.target.value)
                        }
                      />

                    </td>

                    <td className="border p-2">

                      <select
                        className="border p-1 w-full"
                        value={stage.primaryUser}
                        onChange={(e) =>
                          handleStageChange(stage.id, "primaryUser", e.target.value)
                        }
                      >
                        <option>Select</option>
                        <option>Admin</option>
                        <option>Manager</option>
                      </select>

                    </td>

                    <td className="border p-2">

                      <select
                        className="border p-1 w-full"
                        value={stage.secondaryUser}
                        onChange={(e) =>
                          handleStageChange(stage.id, "secondaryUser", e.target.value)
                        }
                      >
                        <option>Select</option>
                        <option>User1</option>
                        <option>User2</option>
                      </select>

                    </td>

                    <td className="border p-2">

                      <select
                        className="border p-1 w-full"
                        value={stage.status}
                        onChange={(e) =>
                          handleStageChange(stage.id, "status", e.target.value)
                        }
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          <button
            onClick={() => setShowCreate(false)}
            className="text-sm text-gray-500"
          >
            ← Back to Workflow List
          </button>

        </>
      )}

    </div>
  );
}