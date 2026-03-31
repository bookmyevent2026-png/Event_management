import React, { useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Header } from "../Organizer/Header";
import {
  BarChart3,
  CalendarDays,
  Mic,
  CheckCircle,
  DatabaseSearch,
  Backpack,
  CircleCheckBig,
  UserCog,
  BetweenHorizontalEnd,
  HelpCircle,
  Store,
  FileCode,
  Users 
} from "lucide-react";

export const Sidebar = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [hovered, setHovered] = useState(null);
  const location = useLocation();

  const navigate = useNavigate();

  const togglePanel = (panelName) => {
    setActivePanel((prev) => (prev === panelName ? null : panelName));
  };

  const menu = [
    { name: "Dashboard", icon: <BarChart3 size={21} />, panel: "dashboard" },
    { name: "My Event", icon: <CalendarDays size={21} />, panel: "myevent" },
    { name: "Program", icon: <Mic size={21} />, panel: "Program" },
    { name: "Account", icon: <DatabaseSearch size={21} />, panel: "Account" },
    {
      name: "Sponsorships",
      icon: <Backpack size={21} />,
      panel: "Sponsorships",
    },
    { name: "Approval", icon: <CircleCheckBig size={21} />, panel: "Approval" },
    {
      name: "Users Setting",
      icon: <UserCog size={21} />,
      panel: "User&Setting",
    },{
      name: "Users",
      icon: <Users size={21} />,
      panel: "Users",
    },
    {
      name: "Master",
      icon: <BetweenHorizontalEnd size={21} />,
      panel: "Master",
    },
    { name: "Help", icon: <HelpCircle size={21} />, panel: "Help&Support" },
    {
      name: "Stall Management",
      icon: <Store size={21} />,
      panel: "Stall&Management",
    },
    { name: "Report", icon: <FileCode size={21} />, panel: "Report" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* HEADER FULL WIDTH */}

      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        {/* ICON SIDEBAR */}

        <div
          style={{
            width: "70px",
            minHeight: "120vh",
            background: "#b0cdd6e3",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "20px",
            gap: "28px",
          }}
        >
          {menu.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                if (item.panel) {
                  togglePanel(item.panel);
                }
              }}
              style={{
                position: "relative",
                padding: "5px",
                borderRadius: "10px",
                cursor: "pointer",
                background:
                  hovered === i || activePanel === item.panel
                    ? "#f8f9fb"
                    : "transparent",
              }}
            >
              {item.icon}

              {/* TOOLTIP */}

              {hovered === i && (
                <div
                  style={{
                    position: "absolute",
                    left: "60px",
                    top: "5px",
                    background: "#b5be94",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    whiteSpace: "nowrap",
                    fontSize: "13px",
                  }}
                >
                  {item.name}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* DASHBOARD PANEL */}

        {activePanel === "dashboard" && (
          <div
            style={{
              width: "260px",
              height: "120vh",
              background: "#c4cfd5",
              padding: "25px",
              boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Dashboard
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span
                style={{
                  cursor: "pointer",
                  fontWeight:
                    location.pathname === "/OrganizerHome/livedashboard"
                      ? "bold"
                      : "normal",
                  color:
                    location.pathname === "/OrganizerHome/livedashboard"
                      ? "#7c2d92"
                      : "black",
                }}
                onClick={() => {
                  navigate("/OrganizerHome/livedashboard");
                  setActivePanel(null); // sidebar close
                }}
              >
                Live Dashboard
              </span>

              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/livedashfoodboard")}
              >
                Live Food Dashboard
              </span>

              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/Organizerdashboard")}
              >
                Organizer Dashboard
              </span>
            </div>
          </div>
        )}

        {/* MY EVENT PANEL */}

        {activePanel === "myevent" && (
          <div
            style={{
              width: "260px",
              height: "120vh",
              background: "#c4cfd5",
              padding: "25px",
              boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              My Events
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/AddonCheckIn")}
              >
                Add-On Check-In / Check-Out
              </span>

              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/SportBooking")}
              >
                Add-On Spot Booking
              </span>
              <span
                style={{
                  cursor: "pointer",
                  fontWeight:
                    location.pathname === "/OrganizerHome/Coupon"
                      ? "bold"
                      : "normal",
                  color:
                    location.pathname === "/OrganizerHome/Coupon"
                      ? "#7c2d92"
                      : "black",
                }}
                onClick={() => {
                  navigate("/OrganizerHome/Coupon");
                  setActivePanel(null);
                }}
              >
                Coupon
              </span>

              <span
                style={{
                  cursor: "pointer",
                  fontWeight:
                    location.pathname === "/OrganizerHome/CrenteEvent"
                      ? "bold"
                      : "normal",
                  color:
                    location.pathname === "/OrganizerHome/CrenteEvent"
                      ? "#7c2d92"
                      : "black",
                }}
                onClick={() => {
                  navigate("/OrganizerHome/CrenteEvent");
                  setActivePanel(null);
                }}
              >
                Create Event
              </span>
              <span
                style={{
                  cursor: "pointer",
                  fontWeight:
                    location.pathname === "/OrganizerHome/EventCheckIn"
                      ? "bold"
                      : "normal",
                  color:
                    location.pathname === "/OrganizerHome/EventCheckIn"
                      ? "#7c2d92"
                      : "black",
                }}
                onClick={() => {
                  navigate("/OrganizerHome/EventCheckIn");
                  setActivePanel(null);
                }}
              >
                Event Check-In / Check-Out
              </span>
              <span
                style={{
                  cursor: "pointer",
                  fontWeight:
                    location.pathname === "/OrganizerHome/FoodCheckIn"
                      ? "bold"
                      : "normal",
                  color:
                    location.pathname === "/OrganizerHome/FoodCheckIn"
                      ? "#7c2d92"
                      : "black",
                }}
                onClick={() => {
                  navigate("/OrganizerHome/FoodCheckIn");
                  setActivePanel(null);
                }}
              >
                Food Check-In / Check-Out
              </span>
              <span
                style={{
                  cursor: "pointer",
                  fontWeight:
                    location.pathname === "/OrganizerHome/messages"
                      ? "bold"
                      : "normal",
                  color:
                    location.pathname === "/OrganizerHome/messages"
                      ? "#7c2d92"
                      : "black",
                }}
                onClick={() => {
                  navigate("/OrganizerHome/messages");
                  setActivePanel(null);
                }}
              >
                messages_&_greeting
              </span>

              <span
                style={{
                  cursor: "pointer",
                  fontWeight:
                    location.pathname === "/OrganizerHome/Pass"
                      ? "bold"
                      : "normal",
                  color:
                    location.pathname === "/OrganizerHome/Pass"
                      ? "#7c2d92"
                      : "black",
                }}
                onClick={() => {
                  navigate("/OrganizerHome/Pass");
                  setActivePanel(null);
                }}
              >
                Pass
              </span>
              <span
                style={{
                  cursor: "pointer",
                  fontWeight:
                    location.pathname === "/OrganizerHome/Todo_task"
                      ? "bold"
                      : "normal",
                  color:
                    location.pathname === "/OrganizerHome/Todo_task"
                      ? "#7c2d92"
                      : "black",
                }}
                onClick={() => {
                  navigate("/OrganizerHome/Todo_task");
                  setActivePanel(null);
                }}
              >
                Todo_task
              </span>
               <span
                style={{
                  cursor: "pointer",
                  fontWeight:
                    location.pathname === "/OrganizerHome/Verify_Event"
                      ? "bold"
                      : "normal",
                  color:
                    location.pathname === "/OrganizerHome/Verify_Event"
                      ? "#7c2d92"
                      : "black",
                }}
                onClick={() => {
                  navigate("/OrganizerHome/Verify_Event");
                  setActivePanel(null);
                }}
              >
                Verify_Event
              </span>
            </div>
          </div>
        )}

        {/* MY EVENT PANEL */}

        {activePanel === "Program" && (
          <div
            style={{
              width: "260px",
              height: "120vh",
              background: "#c4cfd5",
              padding: "25px",
              boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Program
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/Abstract_Verification")}
              >
                Abstract Verification
              </span>

              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/BulkPassPage")}
              >
                Bulk and Pass Generation
              </span>

              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/CreateProgram")}
              >
                Create Program
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/ProgramCheckin")}
              >
                Program Check-In
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/ProgramVerification")}
              >
                Program Verification
              </span>
            </div>
          </div>
        )}

        {activePanel === "Help&Support" && (
          <div
            style={{
              width: "260px",
              height: "120vh",
              background: "#c4cfd5",
              padding: "25px",
              boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Help & Support
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/Complaint_page")}
              >
                Complaint
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/Feedback_page")}
              >
                Feedback
              </span>
            </div>
          </div>
        )}
        {activePanel === "Sponsorships" && (
          <div
            style={{
              width: "260px",
              height: "120vh",
              background: "#c4cfd5",
              padding: "25px",
              boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Sponsorships
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/SponsorshipPage")}
              >
                Sponsorships
              </span>
            </div>
          </div>
        )}

        {activePanel === "Account" && (
          <div
            style={{
              width: "260px",
              height: "120vh",
              background: "#c4cfd5",
              padding: "25px",
              boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Accounts
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/Receipt")}
              >
                Receipt
              </span>
            </div>
          </div>
        )}
        {activePanel === "Report" && (
          <div
            style={{
              width: "260px",
              height: "120vh",
              background: "#c4cfd5",
              padding: "25px",
              boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Report
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/EventReports")}
              >
                Receipt
              </span>
            </div>
          </div>
        )}

        {activePanel === "Stall&Management" && (
          <div
            style={{
              width: "260px",
              height: "130vh",
              background: "#c4cfd5",
              padding: "25px",
              boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Stall Management
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/Manage_Stall")}
              >
                Manage Stall
              </span>
            </div>
          </div>
        )}
        {activePanel === "Approval" && (
          <div
            style={{
              width: "260px",
              height: "130vh",
              background: "#c4cfd5",
              padding: "25px",
              boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Approval
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/AdminApproval")}
              >
                Approval Work Flow
              </span>
            </div>
          </div>
        )}

        {activePanel === "User&Setting" && (
          <div
            style={{
              width: "260px",
              height: "130vh",
              background: "#c4cfd5",
              padding: "25px",
              boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              User Setting
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/Billing")}
              >
                MY Billing
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/Contacts")}
              >
                My Contacts
              </span>
               <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/MyProfile")}
              >
                My Profile
              </span>
                  <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/MyPlan")}
              >
                My Plan
              </span>
            </div>
          </div>
        )}

        {activePanel === "Users" && (
          <div
            style={{
              width: "260px",
              height: "130vh",
              background: "#c4cfd5",
              padding: "25px",
              boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              User
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/ExhibitorSpotRegistration")}
              >
                Exhibitor Spot Registration
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/Exhibitor")}
              >
                Exhibitor
              </span>
               <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/RoleScreen")}
              >
              RoleScreen
              </span>
                  <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/Sponsors")}
              >
                Sponsors
              </span>
                   <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/UserScreen")}
              >
                UserScreen
              </span>
                       <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/User")}
              >
                User
              </span>
            </div>
          </div>
        )}
        {activePanel === "Master" && (
          <div
            style={{
              width: "260px",
              height: "130vh",
              background: "#c4cfd5",
              padding: "25px",
              boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Master
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/PolicyPage")}
              >
                Policy
              </span>

              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/Venu")}
              >
                Venue
              </span>

              <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/OrganizerHome/Vendor")}
              >
                Vendor
              </span>
            </div>
          </div>
        )}

        {/* PAGE CONTENT */}

        <div style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
