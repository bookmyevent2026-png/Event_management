import React, { useState } from "react";
import { useNavigate, Outlet ,useLocation } from "react-router-dom";
import { Header } from "../Organizer/Header";
import {
  BarChart3,
  CalendarDays,
  Mic,
  CheckCircle,
  DatabaseSearch,
  Backpack,
  CircleCheckBig ,
  UserCog ,
  BetweenHorizontalEnd,
  HelpCircle,
  Store ,
  FileCode
} from "lucide-react";

export const Sidebar=()=> {

  const [activePanel,setActivePanel] = useState(null);
  const [hovered,setHovered] = useState(null);
  const location = useLocation();

  const navigate = useNavigate();

  const togglePanel = (panelName) => {
    setActivePanel(prev => prev === panelName ? null : panelName);
  };

  const menu = [
    {name:"Dashboard", icon:<BarChart3 size={26}/>, panel:"dashboard"},
    {name:"My Event", icon:<CalendarDays size={26}/>, panel:"myevent"},
    {name:"Program", icon:<Mic size={26}/>, panel:"Program"},
    {name:"Account", icon:<DatabaseSearch size={26}/>,panel:"Account"},
    {name:"Sponsorships", icon:<Backpack size={26}/>,panel:"Sponsorships"},
    {name:"Apporal", icon:<CircleCheckBig  size={26}/>,panel:"Approval"},
    {name:"Users Setting", icon:<UserCog  size={26}/>,panel:"User&Setting"},
    {name:"Master", icon:<BetweenHorizontalEnd size={26}/>,panel:"Master"},
    {name:"Help", icon:<HelpCircle size={26}/>,panel:"Help&Support"},
    {name:"Stall Management", icon:<Store  size={26}/>,panel:"Stall&Management"},
    {name:"Report", icon:<FileCode size={26}/>,panel:"Report"}
  ];

  return (
<div style={{display:"flex", flexDirection:"column", height:"100vh"}}>

    {/* HEADER FULL WIDTH */}

      <Header/>
    <div style={{display:"flex",flex:1}}>

      {/* ICON SIDEBAR */}

      <div
        style={{
          width:"70px",
          minHeight:"120vh",
          background:"#7c2d92",
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
            onClick={()=>{
              if(item.panel){
                togglePanel(item.panel)
              }
            }}
            style={{
              position:"relative",
              padding:"10px",
              borderRadius:"10px",
              cursor:"pointer",
              background:
                hovered===i || activePanel===item.panel
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
            height:"120vh",
            background:"#c4cfd5",
            padding:"25px",
            boxShadow:"2px 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <h3 style={{marginBottom:"15px",fontWeight:"bold",fontSize:"18px" }}>Dashboard</h3>

          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>

            <span
               style={{
    cursor:"pointer",
    fontWeight: location.pathname === "/OrganizerHome/livedashboard" ? "bold" : "normal",
    color: location.pathname === "/OrganizerHome/livedashboard" ? "#7c2d92" : "black"
  }}
              onClick={()=>{navigate("/OrganizerHome/livedashboard")
                setActivePanel(null); // sidebar close
              }}
              
            >
              Live Dashboard
            </span>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/livedashfoodboard")}
            >
              Live Food Dashboard
            </span>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/Organizerdashboard")}
            >
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
            height:"120vh",
            background:"#c4cfd5",
            padding:"25px",
            boxShadow:"2px 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <h3 style={{marginBottom:"15px",fontWeight:"bold",fontSize:"18px"}}>My Events</h3>

          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/checkin-checkout")}
            >
              Add-On Check-In / Check-Out
            </span>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/spot-booking")}
            >
              Add-On Spot Booking
            </span>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/CrenteEvent")}
            >
              Create Event
            </span>

          </div>

        </div>

      )}

      {/* MY EVENT PANEL */}

      {activePanel==="Program" && (

        <div
          style={{
            width:"260px",
            height:"120vh",
            background:"#c4cfd5",
            padding:"25px",
            boxShadow:"2px 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <h3 style={{marginBottom:"15px",fontWeight:"bold",fontSize:"18px"}}>Program</h3>

          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/Abstract_Verification")}
            >
              Abstract Verification
            </span>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/BulkPassPage")}
            >
              Bulk and Pass Generation
            </span>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/CreateProgram")}
            >
              Create Program
            </span>
            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/ProgramCheckin")}
            >
              Program Check-In
            </span>
            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/ProgramVerification")}
            >
              Program Verification
            </span>

          </div>

        </div>

      )}

      {activePanel==="Help&Support" && (

        <div
          style={{
            width:"260px",
            height:"120vh",
            background:"#c4cfd5",
            padding:"25px",
            boxShadow:"2px 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <h3 style={{marginBottom:"15px",fontWeight:"bold",fontSize:"18px"}}>Help & Support</h3>

          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/Complaint_page")}
            >
              Complaint
            </span>
             <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/Feedback_page")}
            >
              Feedback
            </span>
            
          </div>

        </div>

      )}
      {activePanel==="Sponsorships" && (

        <div
          style={{
            width:"260px",
            height:"120vh",
            background:"#c4cfd5",
            padding:"25px",
            boxShadow:"2px 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <h3 style={{marginBottom:"15px",fontWeight:"bold",fontSize:"18px"}}>Sponsorships</h3>

          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/SponsorshipPage")}
            >
              Sponsorships
            </span>
            
          </div>

        </div>

      )}

      {activePanel==="Account" && (

        <div
          style={{
            width:"260px",
            height:"120vh",
            background:"#c4cfd5",
            padding:"25px",
            boxShadow:"2px 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <h3 style={{marginBottom:"15px",fontWeight:"bold",fontSize:"18px"}}>Accounts</h3>

          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/Receipt")}
            >
              Receipt
            </span>
            
          </div>

        </div>

      )}
      {activePanel==="Report" && (

        <div
          style={{
            width:"260px",
            height:"120vh",
            background:"#c4cfd5",
            padding:"25px",
            boxShadow:"2px 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <h3 style={{marginBottom:"15px",fontWeight:"bold",fontSize:"18px"}}>Report</h3>

          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/EventReports")}
            >
              Receipt
            </span>
            
          </div>

        </div>

      )}

      {activePanel==="Stall&Management" && (

        <div
          style={{
            width:"260px",
            height:"130vh",
            background:"#c4cfd5",
            padding:"25px",
            boxShadow:"2px 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <h3 style={{marginBottom:"15px",fontWeight:"bold",fontSize:"18px"}}>Stall Management</h3>

          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/Manage_Stall")}
            >
              Manage Stall
            </span>
            
          </div>

        </div>

      )}
      {activePanel==="Approval" && (

        <div
          style={{
            width:"260px",
            height:"130vh",
            background:"#c4cfd5",
            padding:"25px",
            boxShadow:"2px 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <h3 style={{marginBottom:"15px",fontWeight:"bold",fontSize:"18px"}}>Approval</h3>

          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/WorkflowPage")}
            >
              Approval Work Flow
            </span>
            
          </div>

        </div>

      )}

      {activePanel==="User&Setting" && (

        <div
          style={{
            width:"260px",
            height:"130vh",
            background:"#c4cfd5",
            padding:"25px",
            boxShadow:"2px 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <h3 style={{marginBottom:"15px",fontWeight:"bold",fontSize:"18px"}}>User Setting</h3>

          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/Billing")}
            >
              MY Biling
            </span>
            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/Contacts")}
            >
              MY Contacts
            </span>
          </div>

        </div>

      )}
      {activePanel==="Master" && (

        <div
          style={{
            width:"260px",
            height:"130vh",
            background:"#c4cfd5",
            padding:"25px",
            boxShadow:"2px 0 10px rgba(0,0,0,0.1)"
          }}
        >

          <h3 style={{marginBottom:"15px",fontWeight:"bold",fontSize:"18px"}}>Master</h3>

          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>

             <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/PolicyPage")}
            >
              Policy
            </span>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/Venu")}
            >
              Venu
            </span>

            <span
              style={{cursor:"pointer"}}
              onClick={()=>navigate("/OrganizerHome/Vendor")}
            >
              Vendor
            </span>
          </div>

        </div>

      )}



      {/* PAGE CONTENT */}

      <div style={{flex:1,padding:"20px"}}>
        <Outlet />
      </div>

    </div>
</div>
  );
}