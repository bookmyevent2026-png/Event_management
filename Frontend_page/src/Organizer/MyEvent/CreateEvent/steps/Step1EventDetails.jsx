import React, { useEffect, useState } from "react";
import axios from "axios";
import { get_Venues_details } from "../../../../Services/api";

const Step1EventDetails = ({ formData, setFormData }) => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const res = await get_Venues_details();
      setVenues(res);
    } catch (error) {
      console.error("Error fetching venues", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      eventDetails: {
        ...formData.eventDetails,
        [name]: type === "checkbox" ? checked : value,
      },
    });
  };

  return (
    <div className="grid grid-cols-3 gap-6 p-4">
      {/* ---------------- LEFT SECTION ---------------- */}
      <div className="space-y-4 border p-4 rounded">
        <h3 className="text-lg font-semibold text-blue-600">
          Event Information
        </h3>

        <div>
          <label className="font-semibold">Event Category *</label>
          <select
            name="category"
            value={formData.eventDetails?.category || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="">Event Category</option>
            <option>Music</option>
            <option>Business</option>
            <option>Technology</option>
            <option>Education</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">
            What’s the Name of Your Event? *
          </label>
          <input
            name="eventName"
            placeholder="Event Title"
            value={formData.eventDetails?.eventName || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Explain About Your Event *</label>
          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.eventDetails?.description || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Event Amenities Description</label>
          <textarea
            name="amenities"
            placeholder="Event Amenities Description"
            value={formData.eventDetails?.amenities || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Tags</label>
          <input
            name="tags"
            placeholder="Add Tags about Your Event"
            value={formData.eventDetails?.tags || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
      </div>

      {/* ---------------- MIDDLE SECTION ---------------- */}
      <div className="space-y-4 border p-4 rounded">
        <h3 className="text-lg font-semibold text-blue-600">
          Event Information
        </h3>

        <div className="flex gap-4">
          {/* Include Program (LEFT SIDE) */}
          <div className="w-1/2">
            <label className="font-semibold">Include Program *</label>

            <div className="flex gap-4 mt-2">
              <label>
                <input
                  type="radio"
                  name="includeProgram"
                  value="Yes"
                  checked={formData.eventDetails?.includeProgram === "Yes"}
                  onChange={handleChange}
                />{" "}
                Yes
              </label>

              <label>
                <input
                  type="radio"
                  name="includeProgram"
                  value="No"
                  checked={formData.eventDetails?.includeProgram === "No"}
                  onChange={handleChange}
                />{" "}
                No
              </label>
            </div>
          </div>

          {/* Event Visibility (RIGHT SIDE) */}
          <div className="w-1/2">
            <label className="font-semibold">Event Visibility *</label>

            <div className="flex gap-4 mt-2">
              <label>
                <input
                  type="radio"
                  name="visibility"
                  value="Public"
                  checked={formData.eventDetails?.visibility === "Public"}
                  onChange={handleChange}
                />{" "}
                Public
              </label>

              <label>
                <input
                  type="radio"
                  name="visibility"
                  value="Private"
                  checked={formData.eventDetails?.visibility === "Private"}
                  onChange={handleChange}
                />{" "}
                Private
              </label>
            </div>
          </div>
        </div>

        {/* Communication */}
        <div>
          <label className="font-semibold">Communication</label>

          <div className="grid grid-cols-3 mt-2">
            <label>
              <input type="checkbox" name="mail" onChange={handleChange} /> Mail
              ID
            </label>

            <label>
              <input type="checkbox" name="whatsapp" onChange={handleChange} />{" "}
              WhatsApp
            </label>

            <label>
              <input type="checkbox" name="print" onChange={handleChange} />{" "}
              Print
            </label>
          </div>
        </div>

        {/* Mandatory Visitors */}
        <div>
          <label className="font-semibold">
            Mandatory for On-Spot Visitors
          </label>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <label>
              <input
                type="checkbox"
                name="visitorMail"
                onChange={handleChange}
              />{" "}
              Mail ID
            </label>
            <label>
              <input
                type="checkbox"
                name="visitorName"
                onChange={handleChange}
              />{" "}
              Visitor Name
            </label>
            <label>
              <input
                type="checkbox"
                name="visitorPhoto"
                onChange={handleChange}
              />{" "}
              Visitor Photo
            </label>
            <label>
              <input
                type="checkbox"
                name="visitorMobile"
                onChange={handleChange}
              />{" "}
              Mobile Number
            </label>
            <label>
              <input
                type="checkbox"
                name="documentProof"
                onChange={handleChange}
              />{" "}
              Document Proof
            </label>
          </div>
        </div>

        <div className="flex gap-6">
          {/* LEFT SIDE */}
          <div className="w-1/2">
            <label className="font-semibold">Pass Validity</label>

            <label className="block mt-2">
              <input
                type="checkbox"
                name="dayPass"
                checked={formData.eventDetails?.dayPass || false}
                onChange={handleChange}
              />
              Is Day Pass
            </label>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-1/2">
            <label className="font-semibold">Include International</label>

            <label className="block mt-2">
              <input
                type="checkbox"
                name="isInternationalInclude"
                checked={formData.eventDetails?.isInternationalInclude || false}
                onChange={handleChange}
              />
              Is International Include
            </label>
          </div>
        </div>

        {/* Mandatory Validation */}
        <div>
          <label className="font-semibold">Mandatory Validation Config</label>

          <label className="block mt-2">
            <input type="checkbox" name="aadhar" onChange={handleChange} />
            Is Aadhar Mandatory
          </label>
          {/* Show only when International is checked */}
          {formData.eventDetails?.isInternationalInclude && (
            <label className="block mt-2">
              <input type="checkbox" name="passport" onChange={handleChange} />
              Is Passport Mandatory
            </label>
          )}
        </div>
        <div className="flex gap-6">
          {/* LEFT SIDE */}
          <div className="w-1/2">
            <label className="font-semibold">Welcome Kit Config</label>

            <label className="block mt-2">
              <input
                type="checkbox"
                name="welcomeKit"
                checked={formData.eventDetails?.welcomeKit || false}
                onChange={handleChange}
              />
              Include Welcome Kit
            </label>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-1/2">
            <label className="font-semibold">Food Provision</label>

            <label className="block mt-2">
              <input
                type="checkbox"
                name="food"
                checked={formData.eventDetails?.food || false}
                onChange={handleChange}
              />
              Include Food
            </label>
          </div>
        </div>
      </div>

      {/* ---------------- RIGHT SECTION ---------------- */}
      <div className="space-y-4 border p-4 rounded">
        <h3 className="text-lg font-semibold text-blue-600">
          Event Date & Location
        </h3>

        {/* Event Type */}
        <div className="flex gap-4 mt-2">
          <label>
            <input
              type="radio"
              name="eventType"
              value="OneTime"
              checked={formData.eventDetails?.eventType === "OneTime"}
              onChange={handleChange}
            />
            One Time
          </label>

          <label>
            <input
              type="radio"
              name="eventType"
              value="Recurring"
              checked={formData.eventDetails?.eventType === "Recurring"}
              onChange={handleChange}
            />
            Recurring
          </label>
        </div>

        {/* Start Date */}
        <div>
          <input
            type="date"
            name="startDate"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Start Time */}
        <div>
          <input
            type="time"
            name="startTime"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* End Date */}
        <div>
          <input
            type="date"
            name="endDate"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* End Time */}
        <div>
          <input
            type="time"
            name="endTime"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        {formData.eventDetails?.eventType === "Recurring" && (
          <div>
            <label className="font-semibold">Occurrence</label>

            <select
              name="occurrence"
              value={formData.eventDetails?.occurrence || ""}
              onChange={handleChange}
              className="border p-2 w-full rounded mt-2"
            >
              <option value="">Occurrence</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
        )}

        {/* Venue */}
        <div>
          <label className="font-semibold">Where It's Located? *</label>

          <select
            name="venue"
            value={formData.eventDetails?.venue || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded mt-2"
          >
            <option value="">Select Venue</option>

            {venues.map((venue) => (
              <option key={venue.id} value={venue.venue_name}>
                {venue.venue_name} - {venue.city_name}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div>
          <textarea
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Step1EventDetails;
