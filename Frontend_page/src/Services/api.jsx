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

// REGISTER API
export const registerUser = async (email, password) => {

  const response = await api.post("/register", {
    email,
    password,
  });

  return response.data;
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
  const res = await api.get(`/superadmin/api/venue/${id}`);
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