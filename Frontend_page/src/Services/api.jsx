// src/Services/api.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

// AXIOS INSTANCE
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// automatically attach token
api.interceptors.request.use((req) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});
// LOGIN API
export const loginUser = (formData) => {
  return api.post("/auth/api/login", formData);
};


/* REGISTER API
export const registerUser = async (email, password) => {

  const response = await api.post("/register", {
    email,
    password,
  });

  return response.data;
};*/

export const registerUser = (formData) => {
  return api.post("/auth/api/register", formData);
};



// GET all vendors
export const getVendors = () => {
  return api.get("/superadmin/api/vendors");
};

// CREATE vendor
export const createVendor = (data) => {
  return api.post("/superadmin/api/create_vendor", data);
};

// GET single vendor
export const getVendorById = (id) => {
  return api.get(`/superadmin/api/vendor/${id}`);
};


// GET all policies
export const getPoliciess = () => {
  return api.get("/superadmin/api/policies");
};

// CREATE policy
export const createPolicy = (data) => {
  return api.post("/superadmin/api/create_policy", data);
};

// GET single policy
export const getPolicyById = (id) => {
  return api.get(`/superadmin/api/policy/${id}`);
};

// ADMIN GET USERS
export const getUsers = async () => {

  const response = await api.get("/admin/users");

  return response.data;
};


// ADMIN DELETE USER
export const getevent = async () => {

  const response = await api.get("/superadmin/api/events_detail");

  return response.data;
};

/* EVENT APIs */
export const get_Venues_details = async () => {
  const res = await api.get("/superadmin/api/venues_details");
  return res.data;
};

/* VENUE APIs */
export const getVenues = async () => {
  const res = await api.get("/superadmin/api/venues");
  console.log(res.data);
  return res.data;
  
};

export const getVenueDetails = async (id) => {
  const res = await api.get(`/superadmin/api/venuedetail/${id}`);
  return res.data;
};

export const createVenue = async (data) => {
  const res = await api.post("/superadmin/api/create_venue", data);
  return res.data;
};

export const getCountries = async () => {
  const res = await api.get("/superadmin/api/countries");
  return res.data;
};

export const getStates = async (id) => {
  const res = await api.get(`/superadmin/api/states/${id}`);
  return res.data;
};

export const getCities = async (id) => {
  const res = await api.get(`/superadmin/api/cities/${id}`);
  return res.data;
};


/* GET EVENTS */
export const getEvents = () => api.get("/events");


export const saveEventDetails = async (data) => {
  const res = await api.post("/superadmin/api/event-details", data);
  return res.data;
};

export const saveBooking = async (data) => {
  const res = await api.post("/superadmin/api/booking", data);
  return res.data;
};

export const saveLayout = async (data) => {
  const res = await api.post("/superadmin/api/layout", data);
  return res.data;
};

export const saveDocuments = async (data) => {
  console.log("Uploading documents with data:", data);
  return axios.post("http://localhost:5000/superadmin/upload/all-docs", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const saveTerms = async (data) => {
  const res = await api.post("/superadmin/api/save-terms", data);
  return res.data;
};

export const saveVendors = async (data) => {
  const res = await api.post("/superadmin/api/save-vendors-sponsors", data);
  return res.data;
};

export const finalSubmit = async (data) => {
  const res = await api.post("/superadmin/event/final-submit", data);
  return res.data;
};

// services/api.js

export const getPolicies = async () => {
  const res = await api.get("/superadmin/api/all-policies");
  return res.data;
};
// Vendor APIs
export const getVendorTypes = async () => {
  const res = await api.get("/superadmin/api/get-vendor-types");
  return res.data;
};

export const getVendorNames = async (vendorType) => {
  const res = await api.get(`/superadmin/api/get-vendor-names/${vendorType}`);
  return res.data;
};

// Sponsor APIs
export const getSponsorNames = async () => {
  const res = await api.get("/superadmin/api/get-sponsor-names");
  return res.data;
};
export const getEventshow = async () => {
  const res = await api.get("/superadmin/get-events");
  return res.data;
};

// user booking API
export const getEventById = async (id) => {
  const res = await api.get(`/superadmin/booking/event/${id}`);
  return res.data;
};


// 🔥 SEND OTP
export const sendOtp = async (email) => {
  const res = await api.post("/otp/send-otp", { email });
  return res.data;
};

// 🔥 VERIFY OTP
export const verifyOtp = async (email, otp) => {
  const res = await api.post("/otp/verify-otp", { email, otp });
  return res.data;
};

// 🔥 RESEND OTP
export const resendOtp = async (email) => {
  const res = await api.post("/otp/resend-otp", { email });
  return res.data;
};


export const bookEvent = async (data) => {
  const res = await api.post("/user/book-event", data);
  return res.data;
};
// Stall Booking
export const bookStall = async (formData) => {
  const res = await api.post("/exhibitor/api/book-stall", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// GET ALL
export const getMyBookings = async (userId) => {
  console.log("Fetching bookings for user ID:", userId);
  const res = await api.get(`/exhibitor/api/my-bookings/${userId}`);
  return res.data;
};

// GET SINGLE
export const getBookingById = async (id) => {
  const res = await api.get(`/exhibitor/api/booking/${id}`);
  return res.data;
};

// UPDATE
export const updateBooking = async (id, data) => {
  const res = await api.put(`/exhibitor/api/update-booking/${id}`, data);
  return res.data;
};

// GET ALL BOOKINGS
export const getAllBookings = async () => {
  const res = await api.get("/superadmin/api/admin/bookings");
  return res.data;
};

// UPDATE STATUS
export const updateBookingStatus = async (id, status) => {
  const res = await api.put(`/superadmin/api/admin/update-booking-status/${id}`, {
    status,
  });
  return res.data;
};

export const getapprovalBookingById = async (id) => {
  const res = await api.get(`/superadmin/api/admin/booking/${id}`);
  return res.data;
};

// GET ALL EVENTS


export const getAllEvents = async () =>{
   const res = await api.get("/superuser/get-events")
   return res.data;
}

export const updateEventStatus = async (id, status) => {
  const res = await api.put(`/superuser/update-status/${id}`, { status });
  return res.data;
};

export const getFullEventDetails = async (id) => {
  const res = await api.get(`/superuser/event-full-details/${id}`);
  return res.data;
};

export const getHomeEventshow = async () => {
  const res = await api.get("/superadmin/home/get-events");
  return res.data;
};


export const resetsendOtp = async (data) => {
  const res = await api.post("/otp/reset/send-otp", data);
  return res.data;
};

export const resetverifyOtp = async (data) => {
  const res = await api.post("/otp/reset/verify-otp", data);
  return res.data;
};

export const resetresendOtp = async (data) => {
  const res = await api.post("/otp/reset/resend-otp", data);
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await api.post("/otp/reset-password", data);
  return res.data;
};
