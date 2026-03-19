import { Routes, Route } from "react-router-dom";

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
import { WorkflowPage } from "./Organizer/Approval/Approval"
import { Billing } from "./Organizer/User Setting/Billing"
import { Contacts } from "./Organizer/User Setting/My_contact"
import { ProgramCheckin } from "./Organizer/Program/ProgramCheckin"
import { ProgramVerification } from "./Organizer/Program/program_verification"
import { BulkPassPage } from "./Organizer/Program/Bulk"
import { Venuepage } from "./Organizer/Master/VenueList"
import { VendorPage } from "./Organizer/Master/Vendor"
import { PolicyPage } from "./Organizer/Master/policy"
import Createvent  from "./Organizer/MyEvent/CreateEvent/EventsPage"
//import { OrganizerWelcome } from "./Organizer/OrganizerWelcome";

export default function App() {

  return (

    <Routes>

      {/* Layout wrapper */}
      <Route path="/" element={<Home />}/>
      <Route path="/Login" element={<Login />}/>
      <Route path="/Register" element={<Register />}/>
      <Route path="/OrganizerHome" element={<Sidebar />}>
        
        <Route path="livedashboard" element={<LiveDashboard />} />
        <Route path="livedashfoodboard" element={<LiveFoodDashboard />} />
        <Route path="Organizerdashboard" element={< Organizerdashboard />} />
        <Route path="Complaint_page" element={<ComplaintPage />} />
        <Route path="Feedback_page" element={<Feedback />} />
        <Route path="CreateProgram" element={<CreateProgram/>} />
        <Route path="Receipt" element={<Receipt/>} />
        <Route path="EventReports" element={<EventReports/>} />
        <Route path="Abstract_Verification" element={<AbstractVerification/>} />
        <Route path="Manage_Stall" element={<ManageStall/>} />
        <Route path="SponsorshipPage" element={<SponsorshipPage/>} />
        <Route path="WorkflowPage" element={<WorkflowPage/>} />
        <Route path="Billing" element={<Billing/>} />
        <Route path="Contacts" element={<Contacts/>} />
        <Route path="ProgramCheckin" element={<ProgramCheckin/>} />
        <Route path="ProgramVerification" element={<ProgramVerification/>} />
        <Route path="BulkPassPage" element={<BulkPassPage/>} />
        <Route path="Venu" element={<Venuepage/>} />
        <Route path="Vendor" element={<VendorPage/>} />
        <Route path="CrenteEvent" element={<Createvent/>} />
        <Route path="PolicyPage" element={<PolicyPage/>} />
      </Route>

    </Routes>

  );
}