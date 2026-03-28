import React, { useEffect, useState } from "react";
import {
  Plus,
  Users,
  Award,
  UserPlus,
  Trash2,
  UploadCloud,
  Check,
  AlertCircle,
} from "lucide-react";
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
      vendors: {
        vendors: vendorList,
        sponsors: sponsorList,
        guests: guestList,
      },
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
      passCount: 0,
    };

    setVendorList((prev) => [...prev, newVendor]);

    setVendorType("");
    setVendorName("");
  };

  const removeVendor = (index) => {
    setVendorList((prev) => prev.filter((_, i) => i !== index));
  };

  const addSponsor = () => {
    if (!sponsorName || !sponsorship) return;

    const newSponsor = {
      sponsorName,
      sponsorship,
    };

    setSponsorList((prev) => [...prev, newSponsor]);

    setSponsorName("");
    setSponsorship("");
  };

  const removeSponsor = (index) => {
    setSponsorList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGuestImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setGuestImage({ file, preview });
  };

  const addGuest = () => {
    // Basic validation
    if (!guestName.trim() || !contact.trim()) return;

    // Letters Only validation for name
    if (!/^[a-zA-Z\s]*$/.test(guestName)) return;

    // Numbers Only validation for contact
    if (!/^\d*$/.test(contact)) return;

    const newGuest = {
      name: guestName.trim(),
      designation: designation.trim(),
      contact: contact.trim(),
      image: guestImage?.preview || "",
    };

    setGuestList((prev) => [...prev, newGuest]);

    setGuestImage(null);
    setGuestName("");
    setDesignation("");
    setContact("");
  };

  const removeGuest = (index) => {
    setGuestList((prev) => prev.filter((_, i) => i !== index));
  };

  // ===========================
  // ✅ VALIDATION HELPERS
  // ===========================
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[a-zA-Z\s]*$/.test(value)) {
      if (value.length <= 20) {
        setGuestName(value);
      }
    }
  };

  const handleDesignationChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[a-zA-Z\s]*$/.test(value)) {
      if (value.length <= 30) {
        setDesignation(value);
      }
    }
  };

  const handleContactChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*$/.test(value)) {
      if (value.length <= 10) {
        setContact(value);
      }
    }
  };

  // ===========================
  // ✅ UI STYLES
  // ===========================
  const inputClasses =
    "w-full h-[45px] px-6 py-2 rounded-full bg-white border border-gray-200 text-gray-800 transition-all duration-200 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 placeholder:text-gray-400 text-sm";
  const selectClasses = `${inputClasses} appearance-none bg-[url('data:image/svg+xml;utf8,<svg fill=\"%236b7280\" height=\"20\" viewBox=\"0 0 24 24\" width=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/></svg>')] bg-no-repeat bg-[right_1rem_center] cursor-pointer`;
  const labelClasses =
    "block text-[11px] font-bold text-gray-400 mb-1.5 ml-4 uppercase tracking-wider";
  const cardClasses =
    "bg-white p-7 rounded-[2.5rem] shadow-sm border border-gray-100/50 h-full flex flex-col hover:shadow-md transition-shadow duration-300";
  const sectionTitleClasses =
    "text-xl font-bold text-gray-800 mb-8 border-l-4 border-purple-500 pl-4 flex items-center gap-3";
  const tableHeaderClasses =
    "bg-gray-50/50 text-gray-400 text-[10px] font-bold uppercase tracking-widest p-4 text-left first:rounded-l-2xl last:rounded-r-2xl";
  const tableCellClasses =
    "p-4 text-sm text-gray-600 border-b border-gray-50/50";
  const actionButtonClasses =
    "w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-full shadow-lg shadow-purple-200 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 mt-4 text-sm tracking-wide";

  return (
    <div className="max-w-[1600px] mx-auto p-4 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* ================= Vendor ================= */}
        <div className={cardClasses}>
          <div className="flex-1">
            <h2 className={sectionTitleClasses}>
              <div className="p-2 bg-purple-50 rounded-xl">
                <Users size={22} className="text-purple-600" />
              </div>
              Vendor Details
            </h2>

            <div className="space-y-5">
              <div className="space-y-1">
                <label className={labelClasses}>Vendor Category</label>
                <select
                  value={vendorType}
                  onChange={(e) => setVendorType(e.target.value)}
                  className={selectClasses}
                >
                  <option value="">Choose Category</option>
                  {vendorTypes.map((v, i) => (
                    <option key={i} value={v.vendor_type}>
                      {v.vendor_type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className={labelClasses}>Provider Name</label>
                <select
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className={selectClasses}
                  disabled={!vendorType}
                >
                  <option value="">Choose Vendor</option>
                  {vendorNames.map((v, i) => (
                    <option key={i} value={v.vendor_name}>
                      {v.vendor_name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={addVendor}
                disabled={!vendorType || !vendorName}
                className={actionButtonClasses}
              >
                <Plus size={18} strokeWidth={2.5} /> Add to List
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="overflow-hidden rounded-3xl border border-gray-100/80 bg-gray-50/30">
              <div className="max-h-[300px] overflow-y-auto scrollbar-hide">
                <table className="w-full border-separate border-spacing-0">
                  <thead className="sticky top-0 z-10">
                    <tr>
                      <th className={tableHeaderClasses}>Vendor</th>
                      <th className={tableHeaderClasses}>Type</th>
                      <th
                        className={`${tableHeaderClasses} text-right w-16`}
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorList.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="p-10 text-center">
                          <div className="flex flex-col items-center gap-2 opacity-30">
                            <Users size={32} />
                            <p className="text-xs font-medium uppercase tracking-widest">
                              Empty List
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      vendorList.map((v, i) => (
                        <tr
                          key={i}
                          className="group hover:bg-white transition-all duration-300"
                        >
                          <td
                            className={`${tableCellClasses} font-semibold text-gray-800`}
                          >
                            {v.vendorName}
                          </td>
                          <td className={tableCellClasses}>
                            <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                              {v.vendorType}
                            </span>
                          </td>
                          <td className={`${tableCellClasses} text-right`}>
                            <button
                              onClick={() => removeVendor(i)}
                              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={16} />
                            </button>
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

        {/* ================= Sponsor ================= */}
        <div className={cardClasses}>
          <div className="flex-1">
            <h2 className={sectionTitleClasses}>
              <div className="p-2 bg-indigo-50 rounded-xl">
                <Award size={22} className="text-indigo-600" />
              </div>
              Sponsorships
            </h2>

            <div className="space-y-5">
              <div className="space-y-1">
                <label className={labelClasses}>Sponsor Partner</label>
                <select
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  className={selectClasses}
                >
                  <option value="">Choose Sponsor</option>
                  {sponsorNames.map((s, i) => (
                    <option key={i} value={s.sponsor_name}>
                      {s.sponsor_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className={labelClasses}>Tier / Level</label>
                <select
                  value={sponsorship}
                  onChange={(e) => setSponsorship(e.target.value)}
                  className={selectClasses}
                >
                  <option value="">Select Tier</option>
                  <option value="Title Sponsor">Title Sponsor</option>
                  <option value="Event Sponsor">Event Sponsor</option>
                  <option value="Gift Sponsor">Gift Sponsor</option>
                </select>
              </div>

              <button
                onClick={addSponsor}
                disabled={!sponsorName || !sponsorship}
                className={actionButtonClasses
                  .replace("purple-600", "indigo-600")
                  .replace("indigo-600", "blue-600")}
              >
                <Plus size={18} strokeWidth={2.5} /> Confirm Sponsor
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="overflow-hidden rounded-3xl border border-gray-100/80 bg-gray-50/30">
              <div className="max-h-[300px] overflow-y-auto scrollbar-hide">
                <table className="w-full border-separate border-spacing-0">
                  <thead className="sticky top-0 z-10">
                    <tr>
                      <th className={tableHeaderClasses}>Sponsor</th>
                      <th className={tableHeaderClasses}>Tier</th>
                      <th
                        className={`${tableHeaderClasses} text-right w-16`}
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sponsorList.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="p-10 text-center">
                          <div className="flex flex-col items-center gap-2 opacity-30">
                            <Award size={32} />
                            <p className="text-xs font-medium uppercase tracking-widest">
                              No Sponsors
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      sponsorList.map((s, i) => (
                        <tr
                          key={i}
                          className="group hover:bg-white transition-all duration-300"
                        >
                          <td
                            className={`${tableCellClasses} font-semibold text-gray-800`}
                          >
                            {s.sponsorName}
                          </td>
                          <td className={tableCellClasses}>
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                              {s.sponsorship}
                            </span>
                          </td>
                          <td className={`${tableCellClasses} text-right`}>
                            <button
                              onClick={() => removeSponsor(i)}
                              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={16} />
                            </button>
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

        {/* ================= Guest ================= */}
        <div className={cardClasses}>
          <div className="flex-1">
            <h2 className={sectionTitleClasses}>
              <div className="p-2 bg-blue-50 rounded-xl">
                <UserPlus size={22} className="text-blue-600" />
              </div>
              Special Guests
            </h2>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-4">
                <label
                  className={`relative flex flex-col items-center justify-center aspect-square border-2 border-dashed rounded-[2rem] transition-all duration-500 cursor-pointer overflow-hidden ${guestImage ? "border-purple-500 bg-purple-50/20" : "border-gray-200 hover:border-purple-400 hover:bg-gray-50 bg-gray-50/50 group"}`}
                >
                  {!guestImage ? (
                    <div className="flex flex-col items-center justify-center text-center p-2">
                      <UploadCloud
                        size={20}
                        className="text-gray-400 group-hover:text-purple-500 transition-colors mb-1"
                      />
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">
                        Photo
                      </span>
                    </div>
                  ) : (
                    <div className="relative w-full h-full group">
                      <img
                        src={guestImage.preview}
                        alt="guest"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <Trash2
                          size={18}
                          className="text-white hover:scale-110 transition-transform"
                          onClick={(e) => {
                            e.preventDefault();
                            setGuestImage(null);
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleGuestImage}
                    accept="image/*"
                  />
                </label>

                <div className="space-y-3">
                  <div className="relative">
                    <input
                      placeholder="Guest Name"
                      value={guestName}
                      onChange={handleNameChange}
                      className={inputClasses}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-300 font-medium">
                      {guestName.length}/20
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      placeholder="Designation"
                      value={designation}
                      onChange={handleDesignationChange}
                      className={inputClasses}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-300 font-medium">
                      {designation.length}/30
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <input
                  placeholder="Contact Number (Digits only)"
                  value={contact}
                  onChange={handleContactChange}
                  className={inputClasses}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-300 font-medium">
                  {contact.length}/10
                </span>
              </div>

              <button
                onClick={addGuest}
                disabled={!guestName || !contact}
                className={actionButtonClasses
                  .replace("purple-600", "blue-600")
                  .replace("indigo-600", "cyan-600")}
              >
                <Plus size={18} strokeWidth={2.5} /> Invite Guest
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="overflow-hidden rounded-3xl border border-gray-100/80 bg-gray-50/30">
              <div className="max-h-[300px] overflow-y-auto scrollbar-hide">
                <table className="w-full border-separate border-spacing-0">
                  <thead className="sticky top-0 z-10">
                    <tr>
                      <th className={tableHeaderClasses}>Guest Info</th>
                      <th
                        className={`${tableHeaderClasses} text-right w-16`}
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {guestList.length === 0 ? (
                      <tr>
                        <td colSpan="2" className="p-10 text-center">
                          <div className="flex flex-col items-center gap-2 opacity-30">
                            <UserPlus size={32} />
                            <p className="text-xs font-medium uppercase tracking-widest">
                              No Guests
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      guestList.map((g, i) => (
                        <tr
                          key={i}
                          className="group hover:bg-white transition-all duration-300"
                        >
                          <td className={tableCellClasses}>
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                {g.image ? (
                                  <img
                                    src={g.image}
                                    alt=""
                                    className="w-10 h-10 rounded-2xl object-cover ring-2 ring-white shadow-sm"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-gray-300 border border-gray-100">
                                    <Users size={16} />
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-gray-800 text-sm truncate leading-none mb-1">
                                  {g.name}
                                </p>
                                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tight truncate">
                                  {g.designation || "Special Guest"}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className={`${tableCellClasses} text-right`}>
                            <button
                              onClick={() => removeGuest(i)}
                              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={16} />
                            </button>
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

export default Step6VendorSponsor;
