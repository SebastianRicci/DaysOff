import "./CalendarView.css";
import CalendarNavbar from "../CalendarNavbar/CalendarNavbar";
import MonthView from "../MonthView/MonthView";
import YearView from "../YearView/YearView";
import React, { useState, useEffect } from "react";

export default function CalendarView({
  holidays,
  holidayDates,
  algorithmDates,
  weekendAlgorithmDates,
}) {
  const [view, setView] = useState("Monthly");

  function convertToCSV(arr) {
    const array = [Object.keys(arr[0])].concat(arr);

    return array
      .map((it) => {
        return Object.values(it).toString();
      })
      .join("\n");
  }

  function createCalendarExport(algorithmDates, holidays) {
    let arr = [];
    for (let i = 0; i < algorithmDates.length; i++) {
      arr.push({ Subject: "DaysOff", "Start Date": algorithmDates[i] });
    }
    for (let i = 0; i < holidays.length; i++) {
      arr.push({ Subject: holidays[i].name, "Start Date": holidays[i].date });
    }
    arr.sort((a, b) => new Date(a["Start Date"]) - new Date(b["Start Date"]));
    return arr;
  }

  function exportCalendar() {
    const csv = convertToCSV(createCalendarExport(algorithmDates, holidays));
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "DaysOff_Calendar.csv");
    link.click();
  }

  return (
    <div>
      <CalendarNavbar setView={setView} exportCalendar={exportCalendar} />
      <div className="calendarContainer">
        {view == "Monthly" && (
          <MonthView
            holidays={holidays}
            holidayDates={holidayDates}
            algorithmDates={algorithmDates}
            weekendAlgorithmDates={weekendAlgorithmDates}
          />
        )}
        {view == "Yearly" && (
          <YearView
            holidays={holidays}
            holidayDates={holidayDates}
            algorithmDates={algorithmDates}
            weekendAlgorithmDates={weekendAlgorithmDates}
          />
        )}
      </div>
    </div>
  );
}
