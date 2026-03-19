import React, { useState } from "react";
import { useNavigate,Outlet } from "react-router-dom";
import {
  BarChart3,
  CalendarDays,
  Mic,
  CheckCircle,
  Coins,
  Briefcase,
  UserCog,
  Users,
  Wrench,
  HelpCircle,
  Store
} from "lucide-react";

export default function Sidebar() {

  const [activePanel,setActivePanel] = useState(null);
  const [hovered,setHovered] = useState(null);

  const navigate = useNavigate();

  const togglePanel = (panelName) => {
    setActivePanel(activePanel === panelName ? null : panelName);
  };

  const menu = [
    {name:"Dashboard", icon:<BarChart3 size={26}/>, panel:"dashboard"},
    {name:"My Event", icon:<CalendarDays size={26}/>, panel:"myevent"},
    {name:"Voice", icon:<Mic size={26}/>},
    {name:"Check", icon:<CheckCircle size={26}/>},
    {name:"Payments", icon:<Coins size={26}/>},
    {name:"Organize", icon:<Briefcase size={26}/>},
    {name:"Admin", icon:<UserCog size={26}/>},
    {name:"Users", icon:<Users size={26}/>},
    {name:"Tools", icon:<Wrench size={26}/>},
    {name:"Help", icon:<HelpCircle size={26}/>},
    {name:"Store", icon:<Store size={26}/>}
  ];

  return (

    <div style={{display:"flex"}}>

      {/* ICON SIDEBAR */}

      <div
        style={{
          width:"70px",
          height:"100vh",
          background:"#8e7373",
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          paddingTop:"20px",
          gap:"28px"
        }}
      >

        {menu.map((item,i)=>(

          <div
            key={i}
            onMouseEnter={()=>setHovered(i)}
            onMouseLeave={()=>setHovered(null)}
            onClick={()=> item.panel && togglePanel(item.panel)}
            style={{
              position:"relative",
              padding:"10px",
              borderRadius:"10px",
              cursor:"pointer",
              background:
                hovered===i ||
                (activePanel==="dashboard" && i===0) ||
                (activePanel==="myevent" && i===1)
                ? "#f8f9fb"
                : "transparent"
            }}
          >

            {item.icon}

            {/* TOOLTIP */}

            {hovered===i && (

              <div
                style={{
                  position:"absolute",
                  left:"60px",
                  top:"5px",
                  background:"#b5be94",
                  padding:"6px 14px",
                  borderRadius:"6px",
                  boxShadow:"0 2px 10px rgba(0,0,0,0.2)",
                  whiteSpace:"nowrap",
                  fontSize:"13px"
                }}
              >

                {item.name}

              </div>

            )}

          </div>

        ))}

      </div>



      {/* DASHBOARD PANEL */}

      {activePanel==="dashboard" && (

        <div
          style={{
            width:"260px",
            height:"100vh",
            background:"#a19071",
            padding:"25px",
            boxShadow:"2px 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <h3 style={{marginBottom:"25px"}}>Dashboard</h3>

          <div style={{display:"flex",flexDirection:"column",gap:"18px"}}>

            <span
      style={{
        cursor:"pointer",
        padding:"8px 12px",
        borderRadius:"6px",
        transition:"0.2s",
        
      }}
      onClick={()=>navigate("/OrganizerHome/livedashboard")}
      onMouseEnter={(e)=>e.target.style.background="#d6c7a7"}
      onMouseLeave={(e)=>e.target.style.background="transparent"}
    >
      Live Dashboard
    </span>

            <span onClick={()=>navigate("/live-food-dashboard")} style={{cursor:"pointer"}}>
              Live Food Dashboard
            </span>

            <span onClick={()=>navigate("/organizer-dashboard")} style={{cursor:"pointer"}}>
              Organizer Dashboard
            </span>

          </div>

        </div>

      )}



      {/* MY EVENT PANEL */}

      {activePanel==="myevent" && (

        <div
          style={{
            width:"260px",
            height:"100vh",
            background:"#a19071",
            padding:"25px",
            boxShadow:"2px 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <h3 style={{marginBottom:"25px"}}>My Events</h3>

          <div style={{display:"flex",flexDirection:"column",gap:"18px"}}>

            <span onClick={()=>navigate("/checkin-checkout")} style={{cursor:"pointer"}}>
              Add-On Check-In / Check-Out
            </span>

            <span onClick={()=>navigate("/spot-booking")} style={{cursor:"pointer"}}>
              Add-On Spot Booking
            </span>

            <span onClick={()=>navigate("/create-event")} style={{cursor:"pointer"}}>
              Create Event
            </span>

          </div>

        </div>

      )}

      <div style={{flex:1,padding:"20px"}}>
              <Outlet />
            </div>

    </div>

  );
}