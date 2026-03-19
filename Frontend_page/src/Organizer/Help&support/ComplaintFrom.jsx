import React, { useState, useEffect } from "react";
import axios from "axios";
import { getevent } from "../../Services/api";

function StarRating({ rating, setRating }) {
  return (
    <div className="flex gap-1 text-2xl cursor-pointer">
      {[1,2,3,4,5].map((star)=>(
        <span
          key={star}
          onClick={()=>setRating(star)}
          className={star <= rating ? "text-yellow-400" : "text-gray-400"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ComplaintPage() {


  const [showForm,setShowForm] = useState(false);

  const [complaints,setComplaints] = useState([]);
  const [events,setEvents] = useState([]);

  const [event,setEvent] = useState("");
  const [explanation,setExplanation] = useState("");

  const [infrastructure,setInfrastructure] = useState(0);
  const [amenities,setAmenities] = useState(0);
  const [experience,setExperience] = useState(0);
  const [venue,setVenue] = useState(0);
  const [transport,setTransport] = useState(0);
  const [convenience,setConvenience] = useState(0);

  useEffect(()=>{
    loadComplaints();
    loadEvents();
  },[]);


  const loadComplaints = async ()=>{
    try{
      const res = await getevent();
      setComplaints(res.data);
    }catch(err){
      console.log(err);
    }
  };



  const loadEvents = async ()=>{
    try{
      const res = await getevent();
      setEvents(res.data);
    }catch(err){
      console.log(err);
    }
  };


  const submitComplaint = async ()=>{

    try{

      await axios.post(`${API}/complaints/`,{
        event:event,
        explanation:explanation,
        infrastructure:infrastructure,
        amenities:amenities,
        experience:experience,
        venue:venue,
        transport:transport,
        convenience:convenience
      });

      setShowForm(false);
      loadComplaints();

    }catch(err){
      console.log(err);
    }
  };


  /* =========================
     IF FORM TRUE → SHOW FORM
     ========================= */

  if(showForm){

    return(

      <div className="min-h-screen bg-gray-100 p-6">

        <div className="bg-white border rounded p-6">

          <h2 className="text-blue-600 text-xl mb-6">
            Complaint Information
          </h2>


          {/* EVENT */}

          <div className="mb-6">

            <label className="block mb-2 font-medium">
              Event *
            </label>

            <select
              value={event}
              onChange={(e)=>setEvent(e.target.value)}
              className="border rounded px-3 py-2 w-80"
            >

              <option value="">Select Event</option>

              {events.map((e)=>(
                <option key={e.id} value={e.id}>
                  {e.event_name}
                </option>
              ))}

            </select>

          </div>


          {/* RATINGS */}

          <div className="grid grid-cols-3 gap-6 mb-8">

            <div>
              <p className="mb-2">Infrastructure</p>
              <StarRating rating={infrastructure} setRating={setInfrastructure}/>
            </div>

            <div>
              <p className="mb-2">Amenities</p>
              <StarRating rating={amenities} setRating={setAmenities}/>
            </div>

            <div>
              <p className="mb-2">Overall Experience</p>
              <StarRating rating={experience} setRating={setExperience}/>
            </div>

            <div>
              <p className="mb-2">Venue & Location</p>
              <StarRating rating={venue} setRating={setVenue}/>
            </div>

            <div>
              <p className="mb-2">Transportation</p>
              <StarRating rating={transport} setRating={setTransport}/>
            </div>

            <div>
              <p className="mb-2">Convenience</p>
              <StarRating rating={convenience} setRating={setConvenience}/>
            </div>

          </div>


          {/* EXPLANATION */}

          <div className="mb-6">

            <label className="block mb-2 font-medium">
              Explanation
            </label>

            <textarea
              value={explanation}
              onChange={(e)=>setExplanation(e.target.value)}
              className="border rounded w-full h-32 p-3"
            />

          </div>


          {/* BUTTONS */}

          <div className="flex gap-4">

            <button
              onClick={submitComplaint}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>

            <button
              onClick={()=>setShowForm(false)}
              className="border px-4 py-2 rounded"
            >
              Back
            </button>

          </div>

        </div>

      </div>

    )
  }


  /* =========================
     DEFAULT → SHOW TABLE
     ========================= */

  return(

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-between items-center mb-4">

        <h1 className="text-2xl font-semibold text-gray-700">
          Complaint
        </h1>

        <button
          onClick={()=>setShowForm(true)}
          className="border rounded p-2 hover:bg-blue-500 hover:text-white"
        >
          +
        </button>

      </div>


      <div className="bg-white border rounded shadow-sm p-4">

        <input
          type="text"
          placeholder="Search Keyword"
          className="border p-2 rounded w-72 mb-4"
        />


        <table className="w-full border">

          <thead className="bg-gray-100">

            <tr className="text-left text-sm">

              <th className="p-2 border">Complaint Code</th>
              <th className="p-2 border">Event Name</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Created By</th>
              <th className="p-2 border">Created On</th>
              <th className="p-2 border">Modified By</th>
              <th className="p-2 border">Modified On</th>

            </tr>

          </thead>

          <tbody>

            {complaints.length === 0 ?(

              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No Data Found
                </td>
              </tr>

            ):(
              complaints.map((c)=>(
                <tr key={c.id}>

                  <td className="p-2 border">{c.code}</td>
                  <td className="p-2 border">{c.event_name}</td>
                  <td className="p-2 border">{c.status}</td>
                  <td className="p-2 border">{c.created_by}</td>
                  <td className="p-2 border">{c.created_on}</td>
                  <td className="p-2 border">{c.modified_by}</td>
                  <td className="p-2 border">{c.modified_on}</td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>

  )

}