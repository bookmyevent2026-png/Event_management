export const Receipt = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-semibold text-gray-700 mb-4">
        Receipt
      </h1>

      {/* FILTER SECTION */}

      <div className="bg-white border rounded-md p-6 mb-6">

        <div className="grid grid-cols-4 gap-6">

          {/* FROM DATE */}

          <div>
            <label className="text-sm font-medium">
              From Date <span className="text-red-500">*</span>
            </label>

            <div className="flex mt-1">
              <input
                type="date"
                id="fromDate"
                className="border w-full p-2 rounded-l"
              />

              <button
                type="button"
                className="bg-blue-600 text-white px-3 rounded-r"
                onClick={() =>
                  document.getElementById("fromDate").showPicker()
                }
              >
                📅
              </button>
            </div>
          </div>

          {/* TO DATE */}

          <div>
            <label className="text-sm font-medium">
              To Date <span className="text-red-500">*</span>
            </label>

            <div className="flex mt-1">
              <input
                type="date"
                id="toDate"
                className="border w-full p-2 rounded-l"
              />

              <button
                type="button"
                className="bg-blue-600 text-white px-3 rounded-r"
                onClick={() =>
                  document.getElementById("toDate").showPicker()
                }
              >
                📅
              </button>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-4 gap-6 mt-6">

          <div>
            <label className="text-sm font-medium">
              Transaction Type <span className="text-red-500">*</span>
            </label>

            <select className="border p-2 w-full mt-1 rounded">
              <option>Select a Transaction Type</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              Plan / Event Name <span className="text-red-500">*</span>
            </label>

            <select className="border p-2 w-full mt-1 rounded">
              <option>Plan / Event Name</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              Payment Status <span className="text-red-500">*</span>
            </label>

            <select className="border p-2 w-full mt-1 rounded">
              <option>Payment Status</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50">
              Search
            </button>
          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white border rounded-md p-6">

        <div className="flex justify-between mb-4">

          <input
            placeholder="Search Keyword"
            className="border p-2 rounded w-64"
          />

          <div className="flex items-center gap-3">

            <label className="text-sm font-medium">
              Total Amount
            </label>

            <input className="border p-2 rounded w-64" />

            <button className="border p-2 rounded">
              ✖
            </button>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm border">

            <thead className="bg-gray-200">

              <tr>

                <th className="border p-2">Action</th>
                <th className="border p-2">Invoice No</th>
                <th className="border p-2">Invoice Date</th>
                <th className="border p-2">Invoice Type</th>
                <th className="border p-2">Billing Person Type</th>
                <th className="border p-2">Billing Person Name</th>
                <th className="border p-2">Visitor Name</th>
                <th className="border p-2">Vehicle No</th>
                <th className="border p-2">Plan / Event Name</th>
                <th className="border p-2">Total Amount</th>
                <th className="border p-2">Invoice Status</th>
                <th className="border p-2">Created By</th>
                <th className="border p-2">Created On</th>

              </tr>

            </thead>

            <tbody>

              <tr>
                <td colSpan="13" className="text-center p-6 text-gray-500">
                  Showing 0 to 0 of 0 entries
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}