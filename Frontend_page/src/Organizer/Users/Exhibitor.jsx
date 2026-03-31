import React, { useMemo, useState } from "react";

const Exhibitor = () => {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  // Empty data to match the screenshot exactly
  const exhibitorData = [];

  const filteredData = useMemo(() => {
    if (!search.trim()) return exhibitorData;

    return exhibitorData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, exhibitorData]);

  return (
    <div className="min-h-screen w-full bg-[#eef2f8]">
      {/* Page Header */}
      <div className="w-full border-b border-[#d8dee9] bg-[#f5f7fb] px-4 py-4">
        <h1 className="text-[28px] font-semibold leading-none text-[#4b6286]">
          Exhibitor
        </h1>
      </div>

      {/* Main Content */}
      <div className="p-3">
        <div className="rounded-md border border-[#d9dee8] bg-[#f7f9fc] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
          <div className="rounded-sm border border-[#d9dee8] bg-white p-4">
            {/* Top Controls */}
            <div className="mb-1 flex items-start justify-between">
              <div className="w-[315px]">
                <input
                  type="text"
                  placeholder="Search Keyword"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-[48px] w-full rounded-[4px] border border-[#cfd6e2] bg-white px-4 text-[16px] text-[#5b6b84] outline-none placeholder:text-[#6f809a] focus:border-[#b8c3d6]"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                {/* Export icons */}
                <button
                  type="button"
                  className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] border border-[#cfd6e2] bg-white text-[#607392] shadow-sm hover:bg-[#f8faff]"
                  title="Export Excel"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                  >
                    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                    <path d="M14 3v5h5" />
                    <path d="M9 10l4 6" />
                    <path d="M13 10l-4 6" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="flex h-[28px] w-[28px] items-center justify-center rounded-[6px] border border-[#cfd6e2] bg-white text-[#607392] shadow-sm hover:bg-[#f8faff]"
                  title="Export PDF"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                  >
                    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                    <path d="M14 3v5h5" />
                    <path d="M9 16h6" />
                    <path d="M10 12h4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-[#d7dce6]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#f4f6fa] text-[#2d3e57]">
                    {[
                      "Action",
                      "Exhibitor Company Name ↑↓",
                      "Primary Contact No ↑↓",
                      "Email ↑↓",
                      "Address ↑↓",
                      "Status ↑↓",
                      "Approval Status ↑↓",
                      "Created By ↑↓",
                      "Created On ↑↓",
                      "Modified By ↑↓",
                      "Modified On ↑↓",
                    ].map((heading, index) => (
                      <th
                        key={index}
                        className="whitespace-nowrap border-r border-b border-[#d7dce6] px-3 py-[8px] text-center text-[14px] font-semibold"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={11}
                        className="border-b border-[#e1e6ef] px-3 py-[10px] text-left text-[14px] text-[#4d5f78]"
                      >
                        No Data Found.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item, index) => (
                      <tr key={index} className="bg-white">
                        <td className="border-b border-r border-[#e1e6ef] px-3 py-2 text-sm">
                          Action
                        </td>
                        <td className="border-b border-r border-[#e1e6ef] px-3 py-2 text-sm">
                          {item.companyName}
                        </td>
                        <td className="border-b border-r border-[#e1e6ef] px-3 py-2 text-sm">
                          {item.contact}
                        </td>
                        <td className="border-b border-r border-[#e1e6ef] px-3 py-2 text-sm">
                          {item.email}
                        </td>
                        <td className="border-b border-r border-[#e1e6ef] px-3 py-2 text-sm">
                          {item.address}
                        </td>
                        <td className="border-b border-r border-[#e1e6ef] px-3 py-2 text-sm">
                          {item.status}
                        </td>
                        <td className="border-b border-r border-[#e1e6ef] px-3 py-2 text-sm">
                          {item.approvalStatus}
                        </td>
                        <td className="border-b border-r border-[#e1e6ef] px-3 py-2 text-sm">
                          {item.createdBy}
                        </td>
                        <td className="border-b border-r border-[#e1e6ef] px-3 py-2 text-sm">
                          {item.createdOn}
                        </td>
                        <td className="border-b border-r border-[#e1e6ef] px-3 py-2 text-sm">
                          {item.modifiedBy}
                        </td>
                        <td className="border-b border-[#e1e6ef] px-3 py-2 text-sm">
                          {item.modifiedOn}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Footer / Pagination */}
              <div className="flex flex-col items-center justify-between gap-3 bg-white px-4 py-3 md:flex-row">
                <div className="w-[180px]" />

                <div className="text-[14px] text-[#5f718a]">
                  Showing 0 to 0 of 0 entries
                </div>

                <div className="flex items-center gap-3">
                  {/* Pagination */}
                  <div className="flex items-center overflow-hidden rounded-[4px] border border-[#e0e5ee] bg-[#fafbfd]">
                    <button className="flex h-[34px] w-[30px] items-center justify-center border-r border-[#e0e5ee] text-[18px] text-[#a4acb8]">
                      «
                    </button>
                    <button className="flex h-[34px] w-[30px] items-center justify-center border-r border-[#e0e5ee] text-[18px] text-[#a4acb8]">
                      ‹
                    </button>
                    <button className="flex h-[34px] w-[30px] items-center justify-center border-r border-[#e0e5ee] text-[18px] text-[#a4acb8]">
                      ›
                    </button>
                    <button className="flex h-[34px] w-[30px] items-center justify-center text-[18px] text-[#a4acb8]">
                      »
                    </button>
                  </div>

                  {/* Entries dropdown */}
                  <div className="relative">
                    <select
                      value={entries}
                      onChange={(e) => setEntries(Number(e.target.value))}
                      className="h-[40px] min-w-[94px] appearance-none rounded-[4px] border border-[#d7dce6] bg-[#f7f8fb] px-3 pr-9 text-[14px] text-[#6a7890] outline-none"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>

                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#95a2b5]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.512a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Table */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exhibitor;
