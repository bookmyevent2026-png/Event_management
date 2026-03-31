import { useState, useEffect } from "react";
import axios from "axios";
import { Eye } from "lucide-react";

export const Organizerdashboard = () => {

  const [page, setPage] = useState("events");
  const [events, setEvents] = useState([]);

  // Axios example
  useEffect(() => {
    axios.get("http://localhost:8000/events") // your backend API
    .then((res)=>{
      setEvents(res.data);
    })
    .catch(()=>{
      // fallback data if API not ready
      setEvents([
        { id:1, code:"EVT-25", name:"MRC Event"},
        { id:2, code:"EVT-22", name:"VALLUVAR KOTTAM PARK"},
        { id:3, code:"EVT-9", name:"Furniture and Home Products Expo"},
        { id:4, code:"EVT-12", name:"LOGMAT EXPO - 2025"},
        { id:5, code:"EVT-11", name:"DISTRICT CONFERENCE 2025"},
        { id:6, code:"EVT-10", name:"Global Startup Networking"},
        { id:7, code:"EVT-6", name:"Interactive Art Installation"},
        { id:8, code:"EVT-5", name:"MedTech for CSI"},
        { id:9, code:"EVT-4", name:"Comic Con 2025"},
        { id:10, code:"EVT-3", name:"Flower Show At Semmozhi Poonga"}
      ])
    })
  },[]);


  // ---------------- EVENTS PAGE ----------------

  if(page==="events"){
    return(

      <div className="min-h-screen bg-gray-100 p-6">

        <h1 className="text-3xl font-semibold mb-6">
          Organizer Dashboard
        </h1>

        <input
        type="text"
        placeholder="Search Keyword"
        className="border p-2 rounded mb-4 w-64"
        />

        <div className="bg-white rounded shadow">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>
                <th className="p-3">Action</th>
                <th>Event Code</th>
                <th>Event Name</th>
              </tr>

            </thead>

            <tbody>

              {events.map((event)=>(
                <tr key={event.id} className="border-t text-center">

                  <td className="p-3">

                    <button
                    onClick={()=>setPage("dashboard")}
                    className="bg-blue-100 px-3 py-1 rounded hover:bg-blue-200"
                    >
                      <Eye size={18} />
                    </button>

                  </td>

                  <td>{event.code}</td>
                  <td>{event.name}</td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    )
  }

  // ---------------- DASHBOARD ----------------

  if(page==="dashboard"){
    return(

      <div className="p-6">

        <button
        onClick={()=>setPage("events")}
        className="mb-4 bg-gray-200 px-4 py-2 rounded"
        >
        ← Back
        </button>

        <h1 className="text-3xl font-bold mb-6">
        Organizer Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-6">

          <div className="col-span-2 bg-indigo-200 p-6 rounded-lg">

            <h2 className="text-xl font-bold">
            Welcome Back Sakthi
            </h2>

            <p className="mt-3">
            You have used 3% of free plan storage.
            Please upgrade your plan to get unlimited storage.
            </p>

            <button
            onClick={()=>setPage("plans")}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded"
            >
            UPGRADE NOW
            </button>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white shadow p-4 rounded">
              <p>Total Visitors</p>
              <h2 className="text-2xl">0</h2>
            </div>

            <div className="bg-white shadow p-4 rounded">
              <p>Total Earnings</p>
              <h2 className="text-2xl">₹450</h2>
            </div>

            <div className="bg-white shadow p-4 rounded">
              <p>Total Earnings</p>
              <h2 className="text-2xl">$0</h2>
            </div>

            <div className="bg-white shadow p-4 rounded">
              <p>Total Passes Sales</p>
              <h2 className="text-2xl">10</h2>
            </div>

            <div className="bg-white shadow p-4 rounded">
              <p>Total Contacts</p>
              <h2 className="text-2xl">0</h2>
            </div>

            <div className="bg-white shadow p-4 rounded">
              <p>Sponsors</p>
              <h2 className="text-2xl">0</h2>
            </div>

          </div>

        </div>

      </div>

    )
  }

  // ---------------- PLANS PAGE ----------------

  if(page==="plans"){
    return(

      <div className="p-10">

        <button
        onClick={()=>setPage("dashboard")}
        className="mb-6 bg-gray-200 px-4 py-2 rounded"
        >
        ← Back
        </button>

        <h1 className="text-3xl mb-8">
        Select Plans
        </h1>

        <div className="grid grid-cols-3 gap-8">

          {["BASIC","PRO","ENTERPRISE"].map((plan,i)=>{

            const price=[99.99,199.99,999.99]

            return(

              <div key={i} className="shadow p-6 rounded text-center">

                <h2 className="text-xl text-blue-600">
                {plan}
                </h2>

                <p className="text-4xl mt-3">
                ₹{price[i]}
                </p>

                <ul className="mt-4">
                  <li>Events Limit</li>
                  <li>Ticket Limit</li>
                  <li>Support</li>
                </ul>

                <button
                onClick={()=>setPage("payment")}
                className="mt-6 bg-blue-600 text-white px-5 py-2 rounded"
                >
                Choose Plan
                </button>

              </div>

            )
          })}

        </div>

      </div>

    )
  }

  // ---------------- PAYMENT PAGE ----------------

  if(page==="payment"){
    return(

      <div className="p-10 grid grid-cols-3 gap-6">

        <div className="col-span-2">

          <button
          onClick={()=>setPage("plans")}
          className="mb-6 bg-gray-200 px-4 py-2 rounded"
          >
          ← Back
          </button>

          <h2 className="text-2xl mb-4">
          Billing Information
          </h2>

          <input
          className="border p-2 w-full mb-3"
          placeholder="Sakthi G"
          />

          <input
          className="border p-2 w-full mb-3"
          placeholder="sakthivelganesan@leitenindia.com"
          />

          <textarea
          className="border p-2 w-full"
          placeholder="Enter Address"
          />

        </div>

        <div className="border p-6 rounded">

          <h2 className="text-xl mb-4">
          Order Summary
          </h2>

          <p>Basic ₹99.99</p>
          <p>Tax 0%</p>
          <p>Tax Total ₹0</p>

          <input
          className="border p-2 mt-4 w-full"
          placeholder="Enter Coupon Code"
          />

          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full">
          APPLY
          </button>

          <p className="mt-6 font-bold">
          Total ₹99.99
          </p>

          <button className="mt-6 bg-blue-700 text-white w-full py-2 rounded">
          Proceed to Payment →
          </button>

        </div>

      </div>

    )
  }

}