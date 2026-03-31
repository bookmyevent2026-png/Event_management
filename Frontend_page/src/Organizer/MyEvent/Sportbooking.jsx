import React, { useState } from "react";
import { Plus, Search, Eye, Filter, Banknote } from "lucide-react";

export default function AddonSpotBooking() {
  const [search, setSearch] = useState("");
  
  const dummyData = [
    { id: 1, addon: "Parking Pass", code: "SP-555", visitor: "David Miller", type: "Cash", amount: "₹200", status: "Paid" },
    { id: 2, addon: "Food Coupon", code: "SP-589", visitor: "Emma Wilson", type: "UPI", amount: "₹500", status: "Paid" },
    { id: 3, addon: "VIP Lounge", code: "SP-602", visitor: "Michael Chen", type: "Credit Card", amount: "₹1500", status: "Pending" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add-On Spot Booking</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search by visitor or code..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <Plus className="w-5 h-5" />
            New Spot Booking
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-gray-600">Action</th>
              <th className="p-4 font-semibold text-gray-600">Add-On Name</th>
              <th className="p-4 font-semibold text-gray-600">Code</th>
              <th className="p-4 font-semibold text-gray-600">Visitor</th>
              <th className="p-4 font-semibold text-gray-600">Payment Type</th>
              <th className="p-4 font-semibold text-gray-600">Amount</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
                <td className="p-4 font-medium">{row.addon}</td>
                <td className="p-4 font-mono text-sm text-gray-500">{row.code}</td>
                <td className="p-4">{row.visitor}</td>
                <td className="p-4 flex items-center gap-2">
                   <Banknote className="w-4 h-4 text-gray-400" />
                   {row.type}
                </td>
                <td className="p-4 font-semibold text-blue-600">{row.amount}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    row.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}