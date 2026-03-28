import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";

import {
  getEventById,
  sendOtp,
  verifyOtp,
  resendOtp,
  bookEvent,
} from "../Services/api";

export const Users = () => {
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
      alert("Enter email first");
      return;
    }

    try {
      setLoading(true);
      await sendOtp(form.email);
      setOtpSent(true);
      alert("OTP Sent!");
    } catch (err) {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 VERIFY OTP
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      await verifyOtp(form.email, otp);
      setVerified(true);
      alert("✅ Email Verified");
    } catch (err) {
      alert("❌ Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 RESEND OTP
  const handleResendOtp = async () => {
    try {
      await resendOtp(form.email);
      alert("OTP Resent!");
    } catch {
      alert("Failed to resend");
    }
  };

  // 🔥 BOOK EVENT
  const handleBook = async () => {
    if (!verified) {
      alert("Please verify email first");
      return;
    }

    try {
      setLoading(true);

      await bookEvent({
        event_id: id,
        ...form,
      });

      alert("🎉 Booking Confirmed! Email Sent");

      // reset
      setForm({ name: "", email: "", phone: "" });
      setOtp("");
      setOtpSent(false);
      setVerified(false);

    } catch (err) {
      alert("❌ Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* 🔥 EVENT HEADER */}
      <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center mb-6">
        
        <div className="flex items-center gap-3">
          <MapPin className="text-blue-500" />
          <div>
            <h2 className="font-bold text-lg">
              {event?.venue || "Loading..."}
            </h2>
            <p className="text-sm text-gray-500">
              {event?.address}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="text-blue-500" />
          <span>{event?.contact || "N/A"}</span>
        </div>
      </div>

      {/* 🔥 BOOKING FORM */}
      <div className="bg-white p-6 rounded-lg shadow max-w-md">
        <h3 className="text-blue-600 font-bold text-xl mb-4">
          Book Your Seat
        </h3>

        <input
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        {/* EMAIL + OTP */}
        <div className="flex gap-2 mb-3">
          <input
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={handleSendOtp}
            className="bg-blue-500 text-white px-3 rounded"
          >
            Send OTP
          </button>
        </div>

        {/* OTP INPUT */}
        {otpSent && (
          <>
            <div className="flex gap-2 mb-3">
              <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <button
                onClick={handleVerifyOtp}
                className="bg-green-500 text-white px-3 rounded"
              >
                Verify
              </button>
            </div>

            <button
              onClick={handleResendOtp}
              className="text-sm text-blue-600 mb-3"
            >
              Resend OTP
            </button>
          </>
        )}

        <input
          name="phone"
          placeholder="Enter Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          onClick={handleBook}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            verified ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          {verified ? "BOOK NOW" : "Verify Email First"}
        </button>

      </div>
    </div>
  );
};