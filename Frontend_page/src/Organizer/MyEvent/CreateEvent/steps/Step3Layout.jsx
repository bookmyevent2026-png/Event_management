import React, { useState } from "react";

const Step3LayoutStall = ({ formData, setFormData }) => {

  const [stallList, setStallList] = useState([]);
  const [amenitiesList, setAmenitiesList] = useState([]);

  const [amenity, setAmenity] = useState("");
  const [qty, setQty] = useState("");

  const stallType = formData.layout?.stallType;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      layout: {
        ...formData.layout,
        [name]: type === "checkbox" ? checked : value
      }
    });
  };

  // ADD STALL
  const addStall = () => {
  const newStall = {
    stallName: formData.layout?.stallName,
    size: formData.layout?.stallSize,
    sizeRange: formData.layout?.sizeRange,
    visibility: formData.layout?.visibility,
    type: formData.layout?.stallType,
    priceINR: formData.layout?.priceINR || "Free",
    priceUSD: formData.layout?.priceUSD || "Free",
    primeSeat: formData.layout?.primeSeat || false,
    primePriceINR: formData.layout?.primePriceINR,
    primePriceUSD: formData.layout?.primePriceUSD
  };

  const updatedStalls = [...stallList, newStall];

  setStallList(updatedStalls);

  // ✅ IMPORTANT: Save into formData
  setFormData({
    ...formData,
    layout: {
      ...formData.layout,
      stalls: updatedStalls
    }
  });
};

  // ADD AMENITIES
  const addAmenity = () => {
  const newAmenity = {
    stallName: formData.layout?.stallName,
    amenity,
    qty
  };

  const updatedAmenities = [...amenitiesList, newAmenity];

  setAmenitiesList(updatedAmenities);

  // ✅ SAVE to formData
  setFormData({
    ...formData,
    layout: {
      ...formData.layout,
      amenities: updatedAmenities
    }
  });

  setAmenity("");
  setQty("");
};

  return (

    <div className="grid grid-cols-2 gap-6">

      {/* LEFT SIDE */}

      <div className="border p-4 rounded space-y-4">

        <h2 className="text-blue-600 font-semibold text-lg">
          Layout Information
        </h2>

        {/* Flooring */}
        <div>
          <label className="font-semibold">Flooring Type</label>

          <div className="flex gap-4 mt-2">
            <label>
              <input type="radio" name="floorType" value="Stall" onChange={handleChange}/>
              Stall
            </label>
          </div>
        </div>

        {/* Stall Booking */}
        <div>
          <label>
            <input type="checkbox" name="dayBased" onChange={handleChange}/>
            <span className="ml-2">Is Day Based</span>
          </label>
        </div>

        {/* Stall Size */}
        <div>
          <label>How much do you want to charge for Stall?</label>

          <div className="flex gap-3 mt-2">

            <input
              name="stallName"
              placeholder="Stall Name"
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <select
              name="stallSize"
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option>Feet</option>
              <option>Meter</option>
            </select>

            <input
              name="sizeRange"
              placeholder="Length / Width"
              onChange={handleChange}
              className="border p-2 rounded"
            />

          </div>
        </div>

        {/* Stall Visibility */}
        <div>

          <label className="font-semibold">Stall Visibility</label>

          <div className="flex gap-6 mt-2">

            <label>
              <input type="radio" name="visibility" value="Public" onChange={handleChange}/>
              Public
            </label>

            <label>
              <input type="radio" name="visibility" value="Private" onChange={handleChange}/>
              Private
            </label>

          </div>

        </div>

        {/* Stall Type */}
        <div>

          <label className="font-semibold">Stall Type</label>

          <div className="flex gap-6 mt-2">

            <label>
              <input type="radio" name="stallType" value="Paid" onChange={handleChange}/>
              Paid
            </label>

            <label>
              <input type="radio" name="stallType" value="Free" onChange={handleChange}/>
              Free
            </label>

          </div>

        </div>

        {/* Person Pass */}
        <div>

          <label>No. of Person Passes Allowed</label>

          <input
            name="personPass"
            type="number"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

        </div>

        {/* PRICE FIELDS ONLY FOR PAID */}

        {stallType === "Paid" && (

        <>
        <div className="grid grid-cols-2 gap-3">

          <input
            name="priceINR"
            placeholder="₹ Price in INR"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="priceUSD"
            placeholder="$ Price in USD"
            onChange={handleChange}
            className="border p-2 rounded"
          />

        </div>

        {/* Prime Stall */}

        <div>

          <label>
            <input type="checkbox" name="primeSeat" onChange={handleChange}/>
            <span className="ml-2">Prime Stall</span>
          </label>

          {formData.layout?.primeSeat && (

          <div className="grid grid-cols-2 gap-3 mt-2">

            <input
              name="primePriceINR"
              placeholder="Addl Price in INR"
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              name="primePriceUSD"
              placeholder="Addl Price in USD"
              onChange={handleChange}
              className="border p-2 rounded"
            />

          </div>

          )}

        </div>
        </>
        )}

        {/* Amenities */}
        <div>

          <h3 className="font-semibold">Amenities</h3>

          <div className="flex gap-3 mt-2">

            <input
              placeholder="Amenities"
              value={amenity}
              onChange={(e) => setAmenity(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <input
              placeholder="No of Qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="border p-2 rounded w-full"
            />

          </div>

          <div className="flex gap-3 mt-3">

            <button
              onClick={addAmenity}
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Add
            </button>

            <button
              onClick={() => {
                setAmenity("");
                setQty("");
              }}
              className="border px-4 py-1 rounded"
            >
              Clear
            </button>

          </div>

        </div>

        {/* Include Tax */}
        <div>

          <label>
            <input type="checkbox" name="includeTax" onChange={handleChange}/>
            <span className="ml-2">Include Tax</span>
          </label>

        </div>

        <button
          onClick={addStall}
          className="bg-indigo-600 text-white px-6 py-2 rounded"
        >
          Add Stall
        </button>

      </div>

      {/* RIGHT SIDE */}

      <div className="space-y-6">

        {/* Layout Summary */}

        <div className="border p-4 rounded">

          <h2 className="text-blue-600 font-semibold text-lg mb-3">
            Layout Summary
          </h2>

          <table className="w-full border text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Stall Name</th>
                <th className="border p-2">Size</th>
                <th className="border p-2">Visibility</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Price INR</th>
                <th className="border p-2">Price USD</th>
              </tr>
            </thead>

            <tbody>

              {stallList.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No Data Found
                  </td>
                </tr>
              )}

              {stallList.map((stall, index) => (
                <tr key={index}>
                  <td className="border p-2">{stall.stallName}</td>
                  <td className="border p-2">{stall.size}</td>
                  <td className="border p-2">{stall.visibility}</td>
                  <td className="border p-2">{stall.type}</td>
                  <td className="border p-2">{stall.priceINR}</td>
                  <td className="border p-2">{stall.priceUSD}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* Amenities Table */}

        <div className="border p-4 rounded">

          <h2 className="text-blue-600 font-semibold text-lg mb-3">
            Amenities
          </h2>

          <table className="w-full border text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Stall Name</th>
                <th className="border p-2">Amenity</th>
                <th className="border p-2">Quantity</th>
              </tr>
            </thead>

            <tbody>

              {amenitiesList.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center p-4">
                    No Data Found
                  </td>
                </tr>
              )}

              {amenitiesList.map((a, index) => (
                <tr key={index}>
                  <td className="border p-2">{a.stallName}</td>
                  <td className="border p-2">{a.amenity}</td>
                  <td className="border p-2">{a.qty}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Step3LayoutStall;