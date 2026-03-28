import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Sidebar } from "./Organizer/Homepage"
import { LiveDashboard } from "./Organizer/Dashboard/LiveDashboard";
import { LiveFoodDashboard } from "./Organizer/Dashboard/LiveFooddashboard";
import  { Organizerdashboard } from "./Organizer/Dashboard/Organizerdashboard";
import ComplaintPage from "./Organizer/Help&support/ComplaintFrom";
import { Feedback }from "./Organizer/Help&support/Feedback"
import { CreateProgram } from "./Organizer/Program/CreateProgram"
import { Receipt } from "./Organizer/Accounts/Receipt"
import { EventReports } from "./Organizer/Reports/EventReports"
import { AbstractVerification } from "./Organizer/Program/Abstract"
import { ManageStall } from "./Organizer/Stall/Manage-stall"
import { SponsorshipPage } from "./Organizer/Sponsorships/Sponsorship"
import  AdminApproval  from "./Organizer/Approval/Approval"
import { Billing } from "./Organizer/User Setting/Billing"
import { Contacts } from "./Organizer/User Setting/My_contact"
import { ProgramCheckin } from "./Organizer/Program/ProgramCheckin"
import { ProgramVerification } from "./Organizer/Program/program_verification"
import { BulkPassPage } from "./Organizer/Program/Bulk"
import { Venuepage } from "./Organizer/Master/VenueList"
import { VendorPage } from "./Organizer/Master/Vendor"
import { PolicyPage } from "./Organizer/Master/policy"
import Createvent  from "./Organizer/MyEvent/CreateEvent/EventsPage"
import { Userbooking }  from "./users/users"

//import { OrganizerWelcome } from "./Organizer/OrganizerWelcome";

import ExhibitorHome  from "./Exhibitor/Exhibitor_Home"
import Exhibitorstall  from "./Exhibitor/Stall_Booking"
import Exhibitorsidebar  from "./Exhibitor/Navbar"
import Exhibitormybooking  from "./Exhibitor/Mybooking"

import  SuperEventsPage  from "./Super_User/Super_user_Home"

import ForgotPassword from "./pages/Forgetpsw"

import Coupon from "./Organizer/MyEvent/Coupon"
import EventCheckIn from "./Organizer/MyEvent/EventCheckin&Checkout"
import FoodCheckIn from "./Organizer/MyEvent/FoodCheckin&Checkout"  
import Messagesgreeting from "./Organizer/MyEvent/messages_&_greeting"  
import Pass from "./Organizer/MyEvent/pass"  


export default function App() {

  return (

    <Routes>

      {/* Layout wrapper */}
      <Route path="/" element={<Home />}/>
      <Route path="/Login" element={<Login />}/>
      <Route path="/Register" element={<Register />}/>
      <Route path="/reset-password" element={<ForgotPassword />}/>
      <Route path="/OrganizerHome" element={<ProtectedRoute allowedRoles={["organizer"]}><Sidebar /> </ProtectedRoute>}>
        <Route path="livedashboard" element={<ProtectedRoute allowedRoles={["organizer"]}><LiveDashboard /></ProtectedRoute>} />
        <Route path="livedashfoodboard" element={<ProtectedRoute allowedRoles={["organizer"]}><LiveFoodDashboard /></ProtectedRoute>} />
        <Route path="Organizerdashboard" element={<ProtectedRoute allowedRoles={["organizer"]}><Organizerdashboard /></ProtectedRoute>} />
        <Route path="Complaint_page" element={<ProtectedRoute allowedRoles={["organizer"]}><ComplaintPage /></ProtectedRoute>} />
        <Route path="Feedback_page" element={<ProtectedRoute allowedRoles={["organizer"]}><Feedback /></ProtectedRoute>} />
        <Route path="CreateProgram" element={<ProtectedRoute allowedRoles={["organizer"]}><CreateProgram /></ProtectedRoute>} />
        <Route path="Receipt" element={<ProtectedRoute allowedRoles={["organizer"]}><Receipt /></ProtectedRoute>} />
        <Route path="EventReports" element={<ProtectedRoute allowedRoles={["organizer"]}><EventReports /></ProtectedRoute>} />
        <Route path="Abstract_Verification" element={<ProtectedRoute allowedRoles={["organizer"]}><AbstractVerification /></ProtectedRoute>} />
        <Route path="Manage_Stall" element={<ProtectedRoute allowedRoles={["organizer"]}><ManageStall /></ProtectedRoute>} />
        <Route path="SponsorshipPage" element={<ProtectedRoute allowedRoles={["organizer"]}><SponsorshipPage /></ProtectedRoute>} />
        <Route path="AdminApproval" element={<ProtectedRoute allowedRoles={["organizer"]}><AdminApproval /></ProtectedRoute>} />
        <Route path="Billing" element={<ProtectedRoute allowedRoles={["organizer"]}><Billing /></ProtectedRoute>} />
        <Route path="Contacts" element={<ProtectedRoute allowedRoles={["organizer"]}><Contacts /></ProtectedRoute>} />
        <Route path="ProgramCheckin" element={<ProtectedRoute allowedRoles={["organizer"]}><ProgramCheckin /></ProtectedRoute>} />
        <Route path="ProgramVerification" element={<ProtectedRoute allowedRoles={["organizer"]}><ProgramVerification /></ProtectedRoute>} />
        <Route path="BulkPassPage" element={<ProtectedRoute allowedRoles={["organizer"]}><BulkPassPage /></ProtectedRoute>} />
        <Route path="Venu" element={<ProtectedRoute allowedRoles={["organizer"]}><Venuepage /></ProtectedRoute>} />
        <Route path="Vendor" element={<ProtectedRoute allowedRoles={["organizer"]}><VendorPage /></ProtectedRoute>} />
        <Route path="CrenteEvent" element={<ProtectedRoute allowedRoles={["organizer"]}><Createvent /></ProtectedRoute>} />
        <Route path="PolicyPage" element={<ProtectedRoute allowedRoles={["organizer"]}><PolicyPage /></ProtectedRoute>} />
        <Route path="Coupon" element={<ProtectedRoute allowedRoles={["organizer"]}><Coupon/></ProtectedRoute>} />
        <Route path="EventCheckIn" element={<ProtectedRoute allowedRoles={["organizer"]}><EventCheckIn/></ProtectedRoute>} />
        <Route path="FoodCheckIn" element={<ProtectedRoute allowedRoles={["organizer"]}><FoodCheckIn/></ProtectedRoute>} />
        <Route path="messages" element={<ProtectedRoute allowedRoles={["organizer"]}><Messagesgreeting /></ProtectedRoute>} />
        <Route path="pass" element={<ProtectedRoute allowedRoles={["organizer"]}><Pass /></ProtectedRoute>} />  
      </Route>
      <Route path="/exhibitor/dashboard" element={<ProtectedRoute allowedRoles={["exhibitor"]}><ExhibitorHome /></ProtectedRoute>} />
      <Route path="/book-stall/:id" element={<ProtectedRoute allowedRoles={["exhibitor"]}><Exhibitorstall /></ProtectedRoute>} />
      <Route path="/usersbooking/:id" element={<ProtectedRoute allowedRoles={["exhibitor"]}><Userbooking /></ProtectedRoute>} />
      <Route path="/exhibitor/my-bookings" element={<ProtectedRoute allowedRoles={["exhibitor"]}><Exhibitormybooking /></ProtectedRoute>} />
      <Route path="/superuser/dashboard" 
        element={
        <ProtectedRoute allowedRoles={["superuser"]}>
          <SuperEventsPage />
          </ProtectedRoute>} />
    </Routes>

  );
}