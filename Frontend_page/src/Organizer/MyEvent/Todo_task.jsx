import React, { useState } from "react";

export default function TodoTask() {
  const [page, setPage] = useState("list"); // list or form
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    taskName: "",
    taskDescription: "",
    todoListName: "",
    startDate: "",
    endDate: "",
    assignTo: "",
    status: "In-Progress",
    complete: 0,
    remarks: "",
  });

  const handleAddTask = () => {
    if (!formData.taskName || !formData.todoListName) {
      alert("Task Name and To-Do List Name are required");
      return;
    }
    setTasks([...tasks, { ...formData }]);
    setFormData({
      taskName: "",
      taskDescription: "",
      todoListName: "",
      startDate: "",
      endDate: "",
      assignTo: "",
      status: "In-Progress",
      complete: 0,
      remarks: "",
    });
    setPage("list");
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {page === "list" && (
        <div>
          {/* Header with title on left and + icon on right */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">To-Do Task</h1>
            <button
              onClick={() => setPage("form")}
              className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-700"
            >
              +
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg shadow">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border">Action</th>
                  <th className="px-4 py-2 border">Task Name</th>
                  <th className="px-4 py-2 border">To-Do List Name</th>
                  <th className="px-4 py-2 border">Start Date</th>
                  <th className="px-4 py-2 border">End Date</th>
                  <th className="px-4 py-2 border">Assigned To</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Complete %</th>
                  <th className="px-4 py-2 border">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center text-gray-500 py-6 border"
                    >
                      No Data Found
                    </td>
                  </tr>
                ) : (
                  tasks.map((t, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => handleDelete(i)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="px-4 py-2 border">{t.taskName}</td>
                      <td className="px-4 py-2 border">{t.todoListName}</td>
                      <td className="px-4 py-2 border">{t.startDate}</td>
                      <td className="px-4 py-2 border">{t.endDate}</td>
                      <td className="px-4 py-2 border">{t.assignTo}</td>
                      <td className="px-4 py-2 border">{t.status}</td>
                      <td className="px-4 py-2 border">{t.complete}%</td>
                      <td className="px-4 py-2 border">{t.remarks}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <span>
              Showing {tasks.length === 0 ? 0 : 1} to {tasks.length} of{" "}
              {tasks.length} entries
            </span>
            <select className="border rounded px-2 py-1">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
      )}

      {page === "form" && (
        <div>
          <h1 className="text-3xl font-bold mb-6">Add To-Do Task</h1>

          {/* Task Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Task Information</h2>
            <input
              type="text"
              placeholder="Enter a Taskname"
              value={formData.taskName}
              onChange={(e) =>
                setFormData({ ...formData, taskName: e.target.value })
              }
              className="border p-2 rounded w-full mb-4"
            />
            <textarea
              placeholder="Enter a Description"
              value={formData.taskDescription}
              onChange={(e) =>
                setFormData({ ...formData, taskDescription: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
          </div>

          {/* To-Do List */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">To-Do List</h2>
            <input
              type="text"
              placeholder="Enter a Todo List Name"
              value={formData.todoListName}
              onChange={(e) =>
                setFormData({ ...formData, todoListName: e.target.value })
              }
              className="border p-2 rounded w-full mb-4"
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
            </div>
            <select
              value={formData.assignTo}
              onChange={(e) =>
                setFormData({ ...formData, assignTo: e.target.value })
              }
              className="border p-2 rounded w-full mb-4"
            >
              <option value="">Select an User</option>
              <option value="User1">User1</option>
              <option value="User2">User2</option>
            </select>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="border p-2 rounded w-full mb-4"
            >
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
            <input
              type="number"
              placeholder="Complete %"
              value={formData.complete}
              onChange={(e) =>
                setFormData({ ...formData, complete: e.target.value })
              }
              className="border p-2 rounded w-full mb-4"
            />
            <textarea
              placeholder="Enter a Remarks"
              value={formData.remarks}
              onChange={(e) =>
                setFormData({ ...formData, remarks: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            onClick={handleAddTask}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Add
          </button>
          <button
            onClick={() => setPage("list")}
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 ml-4"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}