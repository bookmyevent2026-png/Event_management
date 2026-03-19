import React, { useState } from "react";

import {
  saveEventDetails,
  saveBooking,
  saveLayout,
  saveDocuments,
  saveTerms,
  saveVendors,
  finalSubmit,
} from "../../../Services/api";

import Step1EventDetails from "./steps/Step1EventDetails";
import Step2Booking from "./steps/Step2Booking";
import Step3LayoutStall from "./steps/step3layout";
import Step4Documents from "./steps/Step4Documents";
import Step5Terms from "./steps/Step5Terms";
import Step6VendorSponsor from "./steps/Step6VendorSponsor";

const CreateEvent = ({ onBack }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    eventDetails: {},
    booking: {},
    layout: { stalls: [] },
    documents: {
    banner: null,
    docs: []
  },
    terms: [],
    vendors: { vendors: [],sponsors: [],guests: [] },
  });
  console.log("data terms",formData.vendors);
  const handleSubmit = async () => {
    try {
      // STEP 1
      const res = await saveEventDetails(formData.eventDetails);
      const event_id = res.event_id;
      console.log("Event ID:", event_id);

      // STEP 2–6
      await saveBooking({ ...formData.booking, event_id });
      await saveLayout({ ...formData.layout, event_id });

     // 🔥 FILE UPLOAD
    const fd = new FormData();

    fd.append("event_id", event_id);

    // Banner
    if (formData.documents.banner) {
      fd.append("banner", formData.documents.banner);
    }

    // Documents
    formData.documents.docs.forEach((doc, index) => {
      fd.append(`docs_${index}`, doc.file);
      fd.append(`doc_type_${index}`, doc.type);
      fd.append(`doc_number_${index}`, doc.number);
    });

    fd.append("doc_count", formData.documents.docs.length);
    console.log("FormData entries:", fd.entries());
    await saveDocuments(fd); // 🔥 send FormData

      await saveTerms({ terms: formData.terms, event_id });
      await saveVendors({ vendors: formData.vendors, event_id });

      // FINAL
      await finalSubmit({ event_id });

      alert("Event Created Successfully");

    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  return (
    <div className="p-2 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Create Event</h1>

      <div className="flex gap-6 border-b pb-2 mb-6 text-sm">
        <span className={step === 1 ? "font-bold text-indigo-600" : ""}>
          Event Details
        </span>
        <span className={step === 2 ? "font-bold text-indigo-600" : ""}>
          Booking
        </span>
        <span className={step === 3 ? "font-bold text-indigo-600" : ""}>
          Layout & Stall
        </span>
        <span className={step === 4 ? "font-bold text-indigo-600" : ""}>
          Documents
        </span>
        <span className={step === 5 ? "font-bold text-indigo-600" : ""}>
          Terms
        </span>
        <span className={step === 6 ? "font-bold text-indigo-600" : ""}>
          Vendor
        </span>
      </div>

      {step === 1 && (
        <Step1EventDetails formData={formData} setFormData={setFormData} />
      )}

      {step === 2 && (
        <Step2Booking formData={formData} setFormData={setFormData} />
      )}

      {step === 3 && (
        <Step3LayoutStall formData={formData} setFormData={setFormData} />
      )}

      {step === 4 && (
        <Step4Documents formData={formData} setFormData={setFormData} />
      )}

      {step === 5 && (
        <Step5Terms formData={formData} setFormData={setFormData} />
      )}

      {step === 6 && (
        <Step6VendorSponsor formData={formData} setFormData={setFormData} />
      )}

      <div className="flex justify-between mt-10">
        <button
          onClick={() => (step === 1 ? onBack() : setStep(step - 1))}
          className="border px-4 py-2 rounded"
        >
          Back
        </button>

        {step < 6 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="bg-indigo-600 text-white px-6 py-2 rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
