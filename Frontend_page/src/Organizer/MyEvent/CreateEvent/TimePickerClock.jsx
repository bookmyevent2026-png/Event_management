import React, { useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

const ClockTimePicker = ({ value, onChange }) => {
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleTimeChange = (newTime) => {
    setTime(newTime);

    const hours = newTime.getHours().toString().padStart(2, "0");
    const minutes = newTime.getMinutes().toString().padStart(2, "0");

    const formatted = `${hours}:${minutes}`;
    onChange(formatted);
  };

  return (
    <div className="relative">
      <input
        readOnly
        value={value || ""}
        placeholder="Select Time"
        onClick={() => setOpen(!open)}
        className="border p-2 w-full rounded cursor-pointer"
      />

      {open && (
        <div className="absolute bg-white shadow-lg rounded p-4 mt-2 z-50">
          <Clock
            value={time}
            onChange={handleTimeChange}
            size={250}
          />
        </div>
      )}
    </div>
  );
};

export default ClockTimePicker;