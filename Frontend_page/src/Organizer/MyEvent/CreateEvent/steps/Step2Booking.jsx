import React from "react";

const Step2Booking = ({ formData, setFormData }) => {

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Special handling for chargeType
    if (name === "chargeType") {
      let updatedData = {
        ...formData,
        booking: {
          ...formData.booking,
          chargeType: value
        }
      };

      // If Free or Donation → clear paid fields
      if (value === "Free" || value === "Donation") {
        updatedData.booking = {
          ...updatedData.booking,
          includeTax: false,
          razorpayKey: "",
          priceType: "",
          currency: "",
          earlyBirdExpire: ""
        };
      }

      setFormData(updatedData);
      return;
    }

    setFormData({
      ...formData,
      booking: {
        ...formData.booking,
        [name]: type === "checkbox" ? checked : value
      }
    });
  };

  const isPaid = formData.booking?.chargeType === "Paid";

  return (
    <div className="grid grid-cols-2 gap-6">

      {/* LEFT SECTION */}
      <div className="border p-4 rounded space-y-4">

        <h2 className="text-blue-600 font-semibold text-lg">
          Booking Information
        </h2>

        {/* Booking Dates */}
        <div>
          <label className="font-semibold">
            When does your Booking Start for the event?
          </label>

          <div className="flex gap-3 mt-2">
            <input
              type="date"
              name="bookingStartDate"
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />

            <input
              type="date"
              name="bookingEndDate"
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
        </div>

        {/* Capacity */}
        <div>
          <label className="font-semibold">
            What's the Capacity for Your Event?
          </label>

          <input
            name="capacity"
            placeholder="Max Capacity"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Pass Type */}
        <div>
          <label className="font-semibold">Pass Type</label>

          <div className="flex gap-6 mt-2">
            <label>
              <input
                type="radio"
                name="passType"
                value="Single Pass"
                checked={formData.booking?.passType === "Single Pass"}
                onChange={handleChange}
              />
              <span className="ml-2">Single Pass</span>
            </label>

            <label>
              <input
                type="radio"
                name="passType"
                value="Group Pass"
                checked={formData.booking?.passType === "Group Pass"}
                onChange={handleChange}
              />
              <span className="ml-2">Group Pass</span>
            </label>
          </div>
        </div>

        {/* Display On Pass */}
        {formData.booking?.passType === "Single Pass" && (
          <div>
            <label className="font-semibold">Display On Pass</label>

            <div className="space-y-3 mt-2">

              {/* Title */}
              <div className="flex items-center gap-3">
                <input
                  name="title"
                  placeholder="Title"
                  className="border p-2 rounded w-40"
                  onChange={handleChange}
                />

                <label>
                  <input
                    type="radio"
                    name="titleType"
                    value="Editable"
                    onChange={handleChange}
                  /> Editable
                </label>

                <label>
                  <input
                    type="radio"
                    name="titleType"
                    value="Selection"
                    onChange={handleChange}
                  /> Selection
                </label>

                {formData.booking?.titleType === "Selection" && (
                  <input
                    name="titleSelection"
                    placeholder="Enter Selection Names"
                    className="border p-2 rounded"
                    onChange={handleChange}
                  />
                )}
              </div>

              {/* Designation */}
              <div className="flex items-center gap-3">
                <input
                  name="designation"
                  placeholder="Designation"
                  className="border p-2 rounded w-40"
                  onChange={handleChange}
                />

                <label>
                  <input
                    type="radio"
                    name="designationType"
                    value="Editable"
                    onChange={handleChange}
                  /> Editable
                </label>

                <label>
                  <input
                    type="radio"
                    name="designationType"
                    value="Selection"
                    onChange={handleChange}
                  /> Selection
                </label>

                {formData.booking?.designationType === "Selection" && (
                  <input
                    name="designationSelection"
                    placeholder="Enter Selection Names"
                    className="border p-2 rounded"
                    onChange={handleChange}
                  />
                )}
              </div>

              {/* Company */}
              <div className="flex items-center gap-3">
                <input
                  name="company"
                  placeholder="Company/Organization"
                  className="border p-2 rounded w-40"
                  onChange={handleChange}
                />

                <label>
                  <input
                    type="radio"
                    name="companyType"
                    value="Editable"
                    onChange={handleChange}
                  /> Editable
                </label>

                <label>
                  <input
                    type="radio"
                    name="companyType"
                    value="Selection"
                    onChange={handleChange}
                  /> Selection
                </label>

                {formData.booking?.companyType === "Selection" && (
                  <input
                    name="companySelection"
                    placeholder="Enter Selection Names"
                    className="border p-2 rounded"
                    onChange={handleChange}
                  />
                )}
              </div>

            </div>
          </div>
        )}

        {/* Entry Type */}
        <div>
          <label className="font-semibold">Entry Type</label>

          <div className="flex gap-6 mt-2">
            <label>
              <input
                type="radio"
                name="entryType"
                value="Single Entry"
                onChange={handleChange}
              />
              Single Entry
            </label>

            <label>
              <input
                type="radio"
                name="entryType"
                value="Multi Entry"
                onChange={handleChange}
              />
              Multi Entry
            </label>
          </div>
        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="border p-4 rounded space-y-4">

        <h2 className="text-blue-600 font-semibold text-lg">
          Price Information
        </h2>

        {/* Charge Type */}
        <div>
          <label className="font-semibold">
            How much do You Want to Charge for Passes?
          </label>

          <div className="flex gap-6 mt-2">
            <label>
              <input
                type="radio"
                name="chargeType"
                value="Paid"
                checked={formData.booking?.chargeType === "Paid"}
                onChange={handleChange}
              /> Paid
            </label>

            <label>
              <input
                type="radio"
                name="chargeType"
                value="Free"
                checked={formData.booking?.chargeType === "Free"}
                onChange={handleChange}
              /> Free
            </label>

            <label>
              <input
                type="radio"
                name="chargeType"
                value="Donation"
                checked={formData.booking?.chargeType === "Donation"}
                onChange={handleChange}
              /> Donation
            </label>
          </div>
        </div>

        {/* Max Pass */}
        <div>
          <label className="font-semibold">
            Max Number of Passes Allowed/Person
          </label>

          <input
            name="maxPass"
            placeholder="Max Passes / Person"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
              <label className="font-semibold">Razorpay API Key</label>
              <input
                name="razorpayKey"
                placeholder="Razorpay API Key"
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>

        {/* ONLY PAID */}
        {isPaid && (
          <>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="includeTax"
                  onChange={handleChange}
                />
                Include Tax
              </label>
            </div>

            

            <div>
              <label className="font-semibold">Price Type</label>
              <select
                name="priceType"
                onChange={handleChange}
                className="border p-2 w-full rounded"
              >
                <option>National</option>
                <option>International</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">Currency</label>
              <select
                name="currency"
                onChange={handleChange}
                className="border p-2 w-full rounded"
              >
                <option>INR (₹)</option>
                <option>USD ($)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">
                Early Bird Expire Date
              </label>

              <input
                type="datetime-local"
                name="earlyBirdExpire"
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
          </>
        )}

      </div>

    </div>
  );
};

export default Step2Booking;