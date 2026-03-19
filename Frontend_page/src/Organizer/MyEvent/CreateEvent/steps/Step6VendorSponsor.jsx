import React, { useEffect, useState } from "react";
import {
  getVendorTypes,
  getVendorNames,
  getSponsorNames,
} from "../../../../Services/api";

const Step6VendorSponsor = ({ formData, setFormData }) => {

  // ===========================
  // ✅ STATE
  // ===========================

  // Vendor
  const [vendorType, setVendorType] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorTypes, setVendorTypes] = useState([]);
  const [vendorNames, setVendorNames] = useState([]);
  const [vendorList, setVendorList] = useState([]);

  // Sponsor
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorship, setSponsorship] = useState("");
  const [sponsorNames, setSponsorNames] = useState([]);
  const [sponsorList, setSponsorList] = useState([]);

  // Guest
  const [guestImage, setGuestImage] = useState(null);
  const [guestName, setGuestName] = useState("");
  const [designation, setDesignation] = useState("");
  const [contact, setContact] = useState("");
  const [guestList, setGuestList] = useState([]);

  // ===========================
  // ✅ LOAD FROM formData (IMPORTANT FIX)
  // ===========================
  useEffect(() => {
  if (formData?.vendors) {
    setVendorList(formData.vendors.vendors || []);
    setSponsorList(formData.vendors.sponsors || []);
    setGuestList(formData.vendors.guests || []);
  }
}, []);

  // ===========================
  // ✅ SAVE TO formData (SYNC)
  // ===========================
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      vendors: vendorList,
      sponsors: sponsorList,
      guests: guestList,
    }));
  }, [vendorList, sponsorList, guestList]);

  // ===========================
  // ✅ API LOADS
  // ===========================

  // Vendor Types
  useEffect(() => {
    const loadVendorTypes = async () => {
      try {
        const data = await getVendorTypes();
        setVendorTypes(data);
      } catch (err) {
        console.error("Vendor Types Error:", err);
      }
    };
    loadVendorTypes();
  }, []);

  // Vendor Names based on type
  useEffect(() => {
    if (!vendorType) return;

    const loadVendorNames = async () => {
      try {
        const data = await getVendorNames(vendorType);
        setVendorNames(data);
      } catch (err) {
        console.error("Vendor Names Error:", err);
      }
    };
    loadVendorNames();
  }, [vendorType]);

  // Sponsor Names
  useEffect(() => {
    const loadSponsors = async () => {
      try {
        const data = await getSponsorNames();
        setSponsorNames(data);
      } catch (err) {
        console.error("Sponsor Error:", err);
      }
    };
    loadSponsors();
  }, []);

  // ===========================
  // ✅ ACTIONS
  // ===========================

  const addVendor = () => {
    if (!vendorType || !vendorName) return;

    const newVendor = {
      vendorType,
      vendorName,
      passCount: 0
    };

    setVendorList((prev) => [...prev, newVendor]);

    setVendorType("");
    setVendorName("");
  };

  const addSponsor = () => {
    if (!sponsorName || !sponsorship) return;

    const newSponsor = {
      sponsorName,
      sponsorship
    };

    setSponsorList((prev) => [...prev, newSponsor]);

    setSponsorName("");
    setSponsorship("");
  };

  const handleGuestImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setGuestImage({ file, preview });
  };

  const addGuest = () => {
    if (!guestName || !contact) return;

    const newGuest = {
      name: guestName,
      designation,
      contact,
      image: guestImage?.preview || ""
    };

    setGuestList((prev) => [...prev, newGuest]);

    setGuestImage(null);
    setGuestName("");
    setDesignation("");
    setContact("");
  };

  // ===========================
  // ✅ UI
  // ===========================

  return (
    <div className="grid grid-cols-3 gap-6">

      {/* ================= Vendor ================= */}
      <div className="border rounded p-4">

        <h2 className="text-blue-600 font-semibold mb-3">
          Vendor Information
        </h2>

        <select
          value={vendorType}
          onChange={(e) => setVendorType(e.target.value)}
          className="border p-2 w-full mb-2"
        >
          <option value="">Select Vendor Type</option>
          {vendorTypes.map((v, i) => (
            <option key={i} value={v.vendor_type}>
              {v.vendor_type}
            </option>
          ))}
        </select>

        <select
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
          className="border p-2 w-full mb-2"
        >
          <option value="">Select Vendors</option>
          {vendorNames.map((v, i) => (
            <option key={i} value={v.vendor_name}>
              {v.vendor_name}
            </option>
          ))}
        </select>

        <button
          onClick={addVendor}
          className="border border-blue-500 text-blue-600 px-4 py-1 rounded"
        >
          Add
        </button>

        <table className="w-full text-sm border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Vendor Type</th>
              <th className="border p-2">Vendor Name</th>
              <th className="border p-2">Pass Count</th>
            </tr>
          </thead>
          <tbody>
            {vendorList.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center p-3">
                  No Data Found
                </td>
              </tr>
            )}
            {vendorList.map((v, i) => (
              <tr key={i}>
                <td className="border p-2">{v.vendorType}</td>
                <td className="border p-2">{v.vendorName}</td>
                <td className="border p-2">{v.passCount}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* ================= Sponsor ================= */}
      <div className="border rounded p-4">

        <h2 className="text-blue-600 font-semibold mb-3">
          Sponsor Information
        </h2>

        <select
          value={sponsorName}
          onChange={(e) => setSponsorName(e.target.value)}
          className="border p-2 w-full mb-2"
        >
          <option value="">Select Sponsors</option>
          {sponsorNames.map((s, i) => (
            <option key={i} value={s.sponsor_name}>
              {s.sponsor_name}
            </option>
          ))}
        </select>

        <select
          value={sponsorship}
          onChange={(e) => setSponsorship(e.target.value)}
          className="border p-2 w-full mb-2"
        >
          <option value="">Select Sponsorship</option>
          <option value="Title Sponsor">Title Sponsor</option>
          <option value="Event Sponsor">Event Sponsor</option>
          <option value="Gift Sponsor">Gift Sponsor</option>
        </select>

        <button
          onClick={addSponsor}
          className="border border-blue-500 text-blue-600 px-4 py-1 rounded"
        >
          Add
        </button>

        <table className="w-full text-sm border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Sponsor Name</th>
              <th className="border p-2">Sponsorship</th>
            </tr>
          </thead>
          <tbody>
            {sponsorList.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center p-3">
                  No Data Found
                </td>
              </tr>
            )}
            {sponsorList.map((s, i) => (
              <tr key={i}>
                <td className="border p-2">{s.sponsorName}</td>
                <td className="border p-2">{s.sponsorship}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* ================= Guest ================= */}
      <div className="border rounded p-4">

        <h2 className="text-blue-600 font-semibold mb-3">
          Guest Information
        </h2>

        <label className="border-2 border-dashed p-6 flex flex-col items-center cursor-pointer">
          {!guestImage && <span>Upload Guest Profile</span>}
          {guestImage && (
            <img src={guestImage.preview} alt="guest" className="h-24 rounded" />
          )}
          <input type="file" className="hidden" onChange={handleGuestImage} />
        </label>

        <input
          placeholder="Guest Name"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className="border p-2 w-full mt-2"
        />

        <input
          placeholder="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="border p-2 w-full mt-2"
        />

        <input
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="border p-2 w-full mt-2"
        />

        <button
          onClick={addGuest}
          className="border border-blue-500 text-blue-600 px-4 py-1 mt-2 rounded"
        >
          Add
        </button>

        <table className="w-full text-sm border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Guest</th>
              <th className="border p-2">Contact</th>
            </tr>
          </thead>
          <tbody>
            {guestList.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center p-3">
                  No Data Found
                </td>
              </tr>
            )}
            {guestList.map((g, i) => (
              <tr key={i}>
                <td className="border p-2">{g.name}</td>
                <td className="border p-2">{g.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
};

export default Step6VendorSponsor;