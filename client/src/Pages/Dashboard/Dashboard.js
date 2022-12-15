import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";
import SideMenu from "../../Components/SideMenu/SideMenu";
import CalendarView from "../../Components/CalendarView/CalendarView";
import { HolidayAPI } from "../../HolidayAPI/HolidayAPI";

export default function Dashboard({ holidays, vacationDays }) {
  const [action, setAction] = useState("Calendar");
  const [calendar, setCalendar] = useState([]);

  holidays = holidays.length
    ? holidays
    : JSON.parse(localStorage.getItem("holidays"));

  const availableLeaves = vacationDays
    ? vacationDays
    : JSON.parse(localStorage.getItem("vacationDays"));

  const holidayDates = holidays.length
    ? holidays.map((holiday) => holiday.date)
    : JSON.parse(localStorage.getItem("holidays")).map(
        (holiday) => holiday.date
      );

  useEffect(() => {
    HolidayAPI.getCalendar(availableLeaves, holidayDates).then((calendar) =>
      setCalendar(calendar)
    );
  }, []);

  const pickedDays = calendar
    .filter((day) => day.algo == 1)
    .map((day) => day.date);
  const weekendDates = calendar
    .filter((day) => day.algoWeekend == 1)
    .map((day) => day.date);

  return (
    <main>
      <div className="dashboard">
        <SideMenu setAction={setAction} action={action}></SideMenu>
        {action == "Calendar" && (
          <CalendarView
            holidays={holidays}
            holidayDates={holidayDates}
            algorithmDates={pickedDays}
            weekendAlgorithmDates={weekendDates}
          />
        )}
        {action == "Holidays" && <h1>Holidays</h1>}
        {action == "Analytics" && <h1>Analytics</h1>}
      </div>
    </main>
  );
}
