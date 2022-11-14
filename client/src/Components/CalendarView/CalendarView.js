import "./CalendarView.css";
import CalendarNavbar from "../CalendarNavbar/CalendarNavbar";
import MonthView from "../MonthView/MonthView";
import YearView from "../YearView/YearView";
import React, { useState, useEffect } from "react";

export default function CalendarView({
  holidayDates,
  algorithmDates,
  weekendAlgorithmDates,
}) {
  const [view, setView] = useState("Monthly");
  return (
    <div>
      <CalendarNavbar setView={setView}></CalendarNavbar>
      <div className="calendarContainer">
        {view == "Monthly" && (
          <MonthView
            holidayDates={holidayDates}
            algorithmDates={algorithmDates}
            weekendAlgorithmDates={weekendAlgorithmDates}
          />
        )}
        {view == "Yearly" && (
          <YearView
            holidayDates={holidayDates}
            algorithmDates={algorithmDates}
            weekendAlgorithmDates={weekendAlgorithmDates}
          />
        )}
      </div>
    </div>
  );
}
