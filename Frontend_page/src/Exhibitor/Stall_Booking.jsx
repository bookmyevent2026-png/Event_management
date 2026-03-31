import React, { useState, useEffect } from "react";
import { Send, CheckCircle, AlertCircle, Upload, User, Mail, Phone, Building2, MapPin, FileText } from "lucide-react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { bookStall, getEventById } from "../Services/api";
import { useSelector } from "react-redux";

const Stall = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [eventName, setEventName] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const initialFormData = {
    title: "Mr.",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    designation: "",
    companyName: "",
    country: "",
    state: "",
    city: "",
    address: "",
    message: "",
    pinCode: "",
    stallArea: "",
    products: "",
    visitingCard: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.event) {
      setEventName(location.state.event.title);
    } else {
      fetchEvent();
    }
  }, []);
  useEffect(() => {
  if (eventName) {
    setFormData((prev) => ({
      ...prev,
      eventName: eventName,
    }));
  }
}, [eventName]);

  const fetchEvent = async () => {
    try {
      const res = await getEventById(id);
      setEventName(res.event_name);
    } catch (err) {
      console.error(err);
    }
  };

  const showAlert = (message, type = "success", redirect = false) => {
    setModal({ show: true, message, type });

    setTimeout(() => {
      setModal((prev) => ({ ...prev, show: false }));
      if (redirect) {
        navigate("/exhibitor/dashboard");
      }
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setErrors({ ...errors, [name]: "" });

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
      return;
    }

    if (name === "mobile" || name === "pinCode") {
      if (value !== "" && !/^\d+$/.test(value)) {
        setErrors({ ...errors, [name]: "Numbers only" });
        return;
      }
    }

    if (["firstName", "lastName", "city", "state", "country"].includes(name)) {
      if (value !== "" && !/^[a-zA-Z\s]+$/.test(value)) {
        setErrors({ ...errors, [name]: "Letters only" });
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!/^\d{10}$/.test(formData.mobile)) {
      showAlert("Mobile number must be exactly 10 digits", "error");
      setLoading(false);
      return;
    }

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });

    submitData.append("event_id", id);
    submitData.append("user_id", user.id);
    submitData.append("eventName", eventName);

    try {
      const res = await bookStall(submitData);
      console.log(submitData);
      showAlert(res.message || "Stall booked successfully!", "success", true);
      setFormData(initialFormData);
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message ||
        "Error submitting form. Please try again.";
      showAlert(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200 to-transparent rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-200 to-transparent rounded-full opacity-20 blur-3xl animate-float-slow"></div>
      </div>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl transform transition-all animate-in zoom-in duration-300">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
              modal.type === "success" 
                ? "bg-gradient-to-br from-emerald-100 to-teal-100" 
                : "bg-gradient-to-br from-red-100 to-orange-100"
            }`}>
              {modal.type === "success" ? (
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              ) : (
                <AlertCircle className="w-8 h-8 text-red-600" />
              )}
            </div>
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-3">
              {modal.type === "success" ? "Success!" : "Oops!"}
            </h3>
            <p className="text-gray-600 text-center text-base leading-relaxed">
              {modal.message}
            </p>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full flex items-center justify-center px-3 py-4 min-h-screen">
        <div className="w-full max-w-7xl">
          {/* Header Section - Compact */}
          <div className="text-center mb-4 animate-in fade-in slide-in-from-top-6 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 mb-2">
              <Building2 className="w-3 h-3 text-blue-600" />
              <span className="text-xs font-semibold text-blue-700">Exhibition Booth</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              {eventName || "Reserve Your Booth"}
            </h1>
            <p className="text-sm text-gray-600">Showcase your brand at the exhibition</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-8 duration-700" style={{backdropFilter: 'blur(10px)'}}>
            {/* Form Header Bar */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

            <form onSubmit={handleSubmit} className="p-5 md:p-8">
              {/* Section 1: Personal Information */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-blue-600" />
                  <h2 className="text-base font-bold text-gray-900">Personal Information</h2>
                </div>

                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
                    <select
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white"
                    >
                      <option>Mr.</option>
                      <option>Ms.</option>
                      <option>Mrs.</option>
                      <option>Dr.</option>
                    </select>
                  </div>

                  <div className="md:col-span-3 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        placeholder="John"
                        required
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white"
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-0.5">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        placeholder="Doe"
                        required
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white"
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-0.5">{errors.lastName}</p>}
                    </div>
                  </div>
                </div>

                {/* Email & Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder="john@company.com"
                      required
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Mobile *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      placeholder="10 Digits"
                      maxLength="10"
                      required
                      onChange={(e) => {
                        if (e.target.value.length <= 10) {
                          handleChange(e);
                        }
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white"
                    />
                    {errors.mobile && <p className="text-red-500 text-xs mt-0.5">{errors.mobile}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Designation</label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      placeholder="Sales Manager"
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white"
                    />
                  </div>
                </div>

                {/* Company & Location */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      placeholder="Your Company"
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      placeholder="Country"
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white"
                    />
                    {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      placeholder="State"
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white"
                    />
                    {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                  </div>
                </div>
              </div>

              {/* Section 2: Location & Exhibition */}
              <div className="mb-5 pb-5 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <h2 className="text-base font-bold text-gray-900">Location & Requirements</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    placeholder="City"
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white"
                  />
                  {errors.city && <p className="text-red-500 text-xs col-span-1">{errors.city}</p>}

                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    placeholder="Pin Code"
                    maxLength="6"
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white"
                  />
                  {errors.pinCode && <p className="text-red-500 text-xs col-span-1">{errors.pinCode}</p>}

                  <input
                    type="text"
                    name="stallArea"
                    value={formData.stallArea}
                    placeholder="Stall Area"
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white"
                  />

                  <input
                    type="text"
                    name="products"
                    value={formData.products}
                    placeholder="Products"
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      placeholder="Street address"
                      maxLength="100"
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white h-16 resize-none"
                    />
                    <p className="text-xs text-gray-400 mt-0.5">{formData.address.length}/100</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <Upload className="w-3 h-3" /> Visiting Card
                    </label>
                    <input
                      type="file"
                      name="visitingCard"
                      key={formData.visitingCard ? "file-selected" : "file-cleared"}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-indigo-500 file:text-white hover:file:from-blue-600 hover:file:to-indigo-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Message */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <FileText className="w-3 h-3" /> Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  placeholder="Any additional details..."
                  maxLength="100"
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-white h-16 resize-none"
                />
                <p className="text-xs text-gray-400 mt-0.5">{formData.message.length}/100</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-700 transform transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Reserve Booth <Send size={14} />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-500 mt-3">
                By submitting, you agree to our terms
              </p>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        @supports (animation-timeline: view()) {
          .animate-in {
            opacity: 0;
            animation: slideIn 0.6s ease-out forwards;
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Stall;