import React, { useState } from "react";

const Step3LayoutStall = ({ formData, setFormData }) => {
  // ✅ ALWAYS take from formData (NO local state)
  const stallList = formData.layout?.stalls || [];
  const amenitiesList = formData.layout?.amenities || [];

  const [amenity, setAmenity] = useState("");
  const [qty, setQty] = useState("");

  const stallType = formData.layout?.stallType;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      layout: {
        ...formData.layout,
        [name]: type === "checkbox" ? checked : value,
      },
    });
  };

  // ADD STALL
  const addStall = () => {
    const newStall = {
      stallName: formData.layout?.stallName,
      size: `${formData.layout?.sizeRange || ""} ${formData.layout?.stallSize || ""}`,
      sizeRange: formData.layout?.sizeRange,
      visibility: formData.layout?.visibility,
      type: formData.layout?.stallType,
      priceINR: formData.layout?.priceINR || "Free",
      priceUSD: formData.layout?.priceUSD || "Free",
      primeSeat: formData.layout?.primeSeat || false,
      primePriceINR: formData.layout?.primePriceINR,
      primePriceUSD: formData.layout?.primePriceUSD,
    };

    const updatedStalls = [...stallList, newStall];

    setFormData({
      ...formData,
      layout: {
        ...formData.layout,
        stalls: updatedStalls,
      },
    });
  };

  // ADD AMENITIES
  const addAmenity = () => {
    const newAmenity = {
      stallName: formData.layout?.stallName,
      amenity,
      qty,
    };

    const updatedAmenities = [...amenitiesList, newAmenity];

    // ✅ SAVE to formData
    setFormData({
      ...formData,
      layout: {
        ...formData.layout,
        amenities: updatedAmenities,
      },
    });

    setAmenity("");
    setQty("");
  };

  const inputClasses =
    "w-full h-[45px] px-6 py-2 rounded-full bg-white border border-gray-200 text-gray-800 transition-all duration-200 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 placeholder:text-gray-400 text-sm";
  const selectClasses = `${inputClasses} appearance-none bg-[url('data:image/svg+xml;utf8,<svg fill="%236b7280" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>')] bg-no-repeat bg-[right_1rem_center] cursor-pointer`;
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2 ml-4";
  const cardClasses =
    "bg-white p-6 rounded-3xl shadow-sm border border-gray-100";
  const sectionTitleClasses =
    "text-xl font-bold text-gray-800 mb-6 border-l-4 border-purple-500 pl-4";
  const tableHeaderClasses =
    "bg-gray-50 text-gray-600 text-[12px] font-bold uppercase tracking-wider p-4 text-left border-b border-gray-100";
  const tableCellClasses = "p-4 text-sm text-gray-700 border-b border-gray-50";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE: FORM */}
        <div className={`${cardClasses} space-y-8`}>
          <h2 className={sectionTitleClasses}>Layout Information</h2>

          {/* Flooring */}
          <div className="space-y-4">
            <label className={labelClasses}>Flooring Type</label>
            <div className="flex gap-4 px-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="floorType"
                  value="Stall"
                  checked={formData.layout?.floorType === "Stall"}
                  onChange={handleChange}
                  className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                  Stall
                </span>
              </label>
            </div>
          </div>

          {/* Stall Booking Options */}
          <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100/50">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="dayBased"
                checked={formData.layout?.dayBased || false}
                onChange={handleChange}
                className="w-5 h-5 rounded text-purple-600 border-gray-300 focus:ring-purple-500 cursor-pointer"
              />
              <span className="text-sm font-semibold text-purple-800">
                Is Day Based Booking Required?
              </span>
            </label>
          </div>

          {/* Stall Size & Pricing */}
          <div className="space-y-6">
            <label className={labelClasses}>
              How much do you want to charge for Stall?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
              <input
                maxLength={20}
                name="stallName"
                placeholder="Stall Name"
                value={formData.layout?.stallName || ""}
                onChange={handleChange}
                className={inputClasses}
              />
              <div className="flex gap-2">
                <select
                  name="stallSize"
                  onChange={handleChange}
                  className={`${selectClasses} flex-1`}
                >
                  <option>Feet</option>
                  <option>Meter</option>
                </select>
                <input
                  name="sizeRange"
                  placeholder="Length / Width"
                  value={formData.layout?.sizeRange || ""}
                  onChange={handleChange}
                  className={`${inputClasses} flex-1`}
                />
              </div>
            </div>
          </div>

          {/* Stall Visibility & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-2">
            <div className="space-y-4">
              <label className={labelClasses}>Stall Visibility</label>
              <div className="flex gap-6 px-2">
                {["Public", "Private"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="visibility"
                      value={option}
                      checked={formData.layout?.visibility === option}
                      onChange={handleChange}
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-purple-600 transition-colors">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className={labelClasses}>Stall Type</label>
              <div className="flex gap-6 px-2">
                {["Paid", "Free"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="stallType"
                      value={option}
                      checked={formData.layout?.stallType === option}
                      onChange={handleChange}
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-purple-600 transition-colors">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Person Pass */}
          <div className="px-2">
            <label className={labelClasses}>No. of Person Passes Allowed</label>
            <input
              name="personPass"
              type="number"
              value={formData.layout?.personPass || ""}
              onChange={handleChange}
              className={inputClasses}
              placeholder="0"
            />
          </div>

          {/* PRICE FIELDS FOR PAID STALLS */}
          {stallType === "Paid" && (
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-6 animate-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-gray-500 ml-4">
                    PRICE IN INR
                  </label>
                  <input
                    name="priceINR"
                    placeholder="₹ 0.00"
                    value={formData.layout?.priceINR || ""}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-gray-500 ml-4">
                    PRICE IN USD
                  </label>
                  <input
                    name="priceUSD"
                    placeholder="$ 0.00"
                    value={formData.layout?.priceUSD || ""}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Prime Stall Option */}
              <div className="space-y-4 border-t border-gray-200 pt-4">
                <label className="flex items-center gap-3 cursor-pointer group px-2">
                  <input
                    type="checkbox"
                    name="primeSeat"
                    checked={formData.layout?.primeSeat}
                    onChange={handleChange}
                    className="w-5 h-5 rounded text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Mark as Prime Stall
                  </span>
                </label>

                {formData.layout?.primeSeat && (
                  <div className="grid grid-cols-2 gap-4 animate-in zoom-in-95 duration-200">
                    <input
                      name="primePriceINR"
                      placeholder="+ ₹ Prime Add-on"
                      value={formData.layout?.primePriceINR || ""}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                    <input
                      name="primePriceUSD"
                      placeholder="+ $ Prime Add-on"
                      value={formData.layout?.primePriceUSD || ""}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Amenities Section */}
          <div className="space-y-6 pt-4 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 ml-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Add Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
              <input
                placeholder="Amenity Name (e.g. Chair, Table)"
                value={amenity}
                maxLength={50}
                onChange={(e) => setAmenity(e.target.value)}
                className={inputClasses}
              />
              <input
                placeholder="Quantity"
                value={qty}
                type="number"
                onChange={(e) => setQty(e.target.value)}
                className={inputClasses}
              />
            </div>

            <div className="flex gap-3 px-2">
              <button
                onClick={addAmenity}
                className="flex-1 py-3 bg-purple-100 text-purple-700 font-bold rounded-full hover:bg-purple-200 transition-colors active:scale-95"
              >
                Add Amenity
              </button>
              <button
                onClick={() => {
                  setAmenity("");
                  setQty("");
                }}
                className="px-6 py-3 border border-gray-200 text-gray-600 font-bold rounded-full hover:bg-gray-50 transition-colors active:scale-95"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Include Tax & Add Stall Button */}
          <div className="pt-8 border-t border-gray-100 space-y-6">
            <label className="flex items-center gap-3 cursor-pointer group px-4">
              <input
                type="checkbox"
                name="includeTax"
                onChange={handleChange}
                className="w-5 h-5 rounded text-purple-600 border-gray-300 focus:ring-purple-500"
              />
              <span className="text-sm font-semibold text-gray-700">
                Include Tax in Final Price
              </span>
            </label>

            <button
              onClick={addStall}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-full shadow-lg shadow-purple-200 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Confirm and Add Stall to List
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: SUMMARY TABLES */}
        <div className="space-y-8">
          {/* Layout Summary */}
          <div className={cardClasses}>
            <h2 className={sectionTitleClasses}>Layout Summary</h2>
            <div className="overflow-hidden rounded-2xl border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className={tableHeaderClasses}>Stall Name</th>
                      <th className={tableHeaderClasses}>Size</th>
                      <th className={tableHeaderClasses}>Visibility</th>
                      <th className={tableHeaderClasses}>Type</th>
                      <th className={tableHeaderClasses}>Price (INR)</th>
                      <th className={tableHeaderClasses}>Price (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stallList.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="p-12 text-center text-gray-400 italic bg-gray-50/30"
                        >
                          No stalls added yet. Start by filling the form on the
                          left.
                        </td>
                      </tr>
                    ) : (
                      stallList.map((stall, index) => (
                        <tr
                          key={index}
                          className="hover:bg-purple-50/30 transition-colors group"
                        >
                          <td
                            className={`${tableCellClasses} font-semibold text-purple-700`}
                          >
                            {stall.stallName}
                          </td>
                          <td className={tableCellClasses}>{stall.size}</td>
                          <td className={tableCellClasses}>
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-bold ${stall.visibility === "Public" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                            >
                              {stall.visibility}
                            </span>
                          </td>
                          <td className={tableCellClasses}>{stall.type}</td>
                          <td className={`${tableCellClasses} font-bold`}>
                            {stall.priceINR}
                          </td>
                          <td className={`${tableCellClasses} font-bold`}>
                            {stall.priceUSD}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Amenities Summary */}
          <div className={cardClasses}>
            <h2 className={sectionTitleClasses}>Included Amenities</h2>
            <div className="overflow-hidden rounded-2xl border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className={tableHeaderClasses}>Stall Name</th>
                      <th className={tableHeaderClasses}>Amenity</th>
                      <th className={tableHeaderClasses}>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amenitiesList.length === 0 ? (
                      <tr>
                        <td
                          colSpan="3"
                          className="p-12 text-center text-gray-400 italic bg-gray-50/30"
                        >
                          No amenities added.
                        </td>
                      </tr>
                    ) : (
                      amenitiesList.map((a, index) => (
                        <tr
                          key={index}
                          className="hover:bg-blue-50/30 transition-colors"
                        >
                          <td className={tableCellClasses}>{a.stallName}</td>
                          <td
                            className={`${tableCellClasses} font-medium text-gray-900`}
                          >
                            {a.amenity}
                          </td>
                          <td className={tableCellClasses}>
                            <span className="bg-gray-100 px-3 py-1 rounded-lg font-bold text-gray-700">
                              {a.qty}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3LayoutStall;
