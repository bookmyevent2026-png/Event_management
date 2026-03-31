import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle,
  Send,
  Loader2,
} from "lucide-react";

import {
  getEventById,
  sendOtp,
  verifyOtp,
  resendOtp,
  bookEvent,
} from "../Services/api";

export const Userbooking = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Summary
  const [agreed, setAgreed] = useState(false); // For T&C checkbox

  // 🔥 TOAST STATE
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info", // success, error, info, warning
  });

  // 🔥 SHOW TOAST HELPER
  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "info" });
    }, 3000);
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const data = await getEventById(id);
      setEvent(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 SEND OTP
  const handleSendOtp = async () => {
    if (!form.email) {
      showToast("Please enter your email first!", "warning");
      return;
    }

    try {
      setLoading(true);
      await sendOtp(form.email);
      setOtpSent(true);
      showToast("OTP sent successfully to your email!", "success");
    } catch (err) {
      showToast("Failed to send OTP. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      showToast("Please enter the OTP", "warning");
      return;
    }
    try {
      setLoading(true);
      await verifyOtp(form.email, otp);
      setVerified(true);
      showToast("Email verified successfully!", "success");
    } catch (err) {
      showToast("Invalid OTP. Please check and try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 RESEND OTP
  const handleResendOtp = async () => {
    try {
      await resendOtp(form.email);
      showToast("OTP resent successfully!", "success");
    } catch {
      showToast("Failed to resend OTP.", "error");
    }
  };

  // 🔥 BOOK EVENT
  const handleBook = async () => {
    if (!verified) {
      showToast("Please verify your email first.", "warning");
      return;
    }

    try {
      setLoading(true);

      await bookEvent({
        event_id: id,
        ...form,
      });

      showToast("Booking confirmed! Check your email for details.", "success");

      // reset
      setForm({ name: "", email: "", phone: "" });
      setOtp("");
      setOtpSent(false);
      setVerified(false);
      setStep(1);
      setAgreed(false);
    } catch (err) {
      showToast("Booking failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative overflow-hidden">
      {/* 🔥 TOAST NOTIFICATION */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 animate-bounce-in">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border ${
              toast.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : toast.type === "error"
                  ? "bg-red-50 border-red-200 text-red-800"
                  : toast.type === "warning"
                    ? "bg-amber-50 border-amber-200 text-amber-800"
                    : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            {toast.type === "success" && (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
            {toast.type === "error" && (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            {toast.type === "warning" && (
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            )}
            {toast.type === "info" && (
              <Info className="w-5 h-5 text-blue-600" />
            )}
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => setToast({ ...toast, show: false })}
              className="ml-2 hover:opacity-70"
            >
              <XCircle className="w-4 h-4 opacity-50" />
            </button>
          </div>
        </div>
      )}

      {/* 🔥 EVENT HEADER */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <MapPin className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-2xl text-gray-900 leading-tight">
              {event?.venue || "Loading..."}
            </h2>
            <p className="text-gray-500 mt-1 flex items-center gap-1">
              {event?.address || "Fetching address..."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-3 bg-gray-50 rounded-xl border border-gray-100">
          <Phone className="text-blue-600 w-5 h-5" />
          <span className="font-semibold text-gray-700">
            {event?.contact || "N/A"}
          </span>
        </div>
      </div>

      {/* 🔥 BOOKING FORM & SUMMARY */}
      <div className="flex justify-center">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 max-w-lg w-full overflow-hidden">
          {step === 1 ? (
            <div className="p-8">
              <div className="mb-8 text-center">
                <h3 className="text-gray-900 font-black text-3xl mb-2">
                  Secure Your Spot
                </h3>
                <p className="text-gray-500">
                  Fill in your details to get started
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                    Full Name
                  </label>
                  <input
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all outline-none bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* EMAIL + OTP */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                    Email Address
                  </label>
                  <div className="flex gap-3">
                    <input
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      disabled={verified}
                      className={`flex-1 border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all outline-none bg-gray-50 focus:bg-white ${verified ? "opacity-60 cursor-not-allowed" : ""}`}
                    />
                    {!verified && (
                      <button
                        onClick={handleSendOtp}
                        disabled={loading || !form.email}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-2xl font-bold transition-all disabled:bg-gray-200 flex items-center gap-2"
                      >
                        {loading && !otpSent ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        {otpSent ? "Resend" : "Send"}
                      </button>
                    )}
                    {verified && (
                      <div className="bg-green-100 text-green-700 px-6 rounded-2xl font-bold flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Verified
                      </div>
                    )}
                  </div>
                </div>

                {/* OTP INPUT */}
                {otpSent && !verified && (
                  <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 animate-fade-in">
                    <label className="block text-sm font-bold text-blue-900 mb-3 ml-1 uppercase tracking-wider">
                      Verify Identity
                    </label>
                    <div className="flex gap-3">
                      <input
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="flex-1 border-2 border-white p-4 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all outline-none bg-white shadow-sm"
                      />
                      <button
                        onClick={handleVerifyOtp}
                        disabled={loading || !otp}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 rounded-2xl font-bold transition-all shadow-lg shadow-green-100 flex items-center gap-2"
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Verify"
                        )}
                      </button>
                    </div>
                    <div className="mt-4 flex justify-between items-center px-1">
                      <p className="text-xs text-blue-600 font-medium italic">
                        We've sent a code to your email
                      </p>
                      <button
                        onClick={handleResendOtp}
                        className="text-sm font-bold text-blue-700 hover:underline"
                      >
                        Resend Code
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all outline-none bg-gray-50 focus:bg-white"
                  />
                </div>

                {verified && (
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-5 rounded-3xl text-white font-black text-lg transition-all shadow-xl mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] shadow-blue-200 flex items-center justify-center gap-2"
                  >
                    NEXT
                    <CheckCircle className="w-5 h-5" />
                  </button>
                )}
                {!verified && (
                  <div className="w-full py-5 rounded-3xl bg-gray-100 text-gray-400 font-bold text-center mt-4">
                    PLEASE VERIFY EMAIL TO PROCEED
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              {/* Order Summary Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-blue-900 tracking-tight">
                  ORDER SUMMARY
                </h3>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Edit Details
                </button>
              </div>

              {/* Summary Items */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Sub Total</span>
                  <span className="font-medium text-gray-900">₹0.00</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900 text-sm">
                    (1 X Pass)
                  </span>
                  <span className="font-medium text-gray-900">₹0.00</span>
                </div>

                <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                  <span className="font-bold text-gray-900">Tax Amount</span>
                  <span className="font-medium text-gray-900">₹0.00</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Meal Price</span>
                  <span className="font-medium text-gray-900">₹0.00</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">
                    Meal Tax Amount
                  </span>
                  <span className="font-medium text-gray-900">₹0.00</span>
                </div>

                <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                  <span className="font-bold text-gray-900">
                    Add-On Tax Amount
                  </span>
                  <span className="font-medium text-gray-900">₹0.00</span>
                </div>

                <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                  <span className="font-bold text-gray-900">
                    Coupon Code (-)
                  </span>
                  <span className="font-medium text-gray-900">- ₹0.00</span>
                </div>

                {/* Coupon Input */}
                <div className="flex gap-2 mt-4">
                  <input
                    placeholder="Enter Coupon Code"
                    className="flex-1 border border-gray-200 px-4 py-2 rounded text-sm focus:outline-none focus:border-blue-400"
                  />
                  <button className="bg-sky-400 hover:bg-sky-500 text-white px-6 py-2 rounded text-sm font-bold transition-colors">
                    APPLY
                  </button>
                </div>

                <div className="flex justify-between items-center border-t border-gray-200 pt-6">
                  <span className="font-black text-gray-900 text-lg">
                    Total
                  </span>
                  <span className="font-black text-gray-900 text-lg">
                    ₹0.00
                  </span>
                </div>

                {/* T&C */}
                <div className="flex items-start gap-3 mt-6">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <p className="text-[12px] text-gray-600 leading-tight">
                    By clicking "Proceed to Pay", you agree to our{" "}
                    <span className="text-blue-600 cursor-pointer">
                      Terms & Conditions
                    </span>
                    ,
                  </p>
                </div>
              </div>

              {/* Final Button */}
              <button
                onClick={handleBook}
                disabled={loading || !agreed}
                className={`w-full py-4 text-white font-bold text-lg transition-all mt-auto ${
                  agreed
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>PROCESSING...</span>
                  </div>
                ) : (
                  "PROCEED TO CONFIRM"
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Custom Animations */}
      <style>{`
        @keyframes bounce-in {
          0% { transform: translateY(-20px); opacity: 0; }
          60% { transform: translateY(5px); opacity: 1; }
          100% { transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-bounce-in { animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};
