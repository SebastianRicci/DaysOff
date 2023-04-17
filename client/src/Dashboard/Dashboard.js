import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import { HolidayAPI } from "../HolidayAPI/HolidayAPI";
import Navbar from "../Components/Navbar/Navbar";
import Calendar from "react-calendar";
import Holidays from "../Components/Holidays/Holidays";

export default function Dashboard() {
  // const [action, setAction] = useState("Calendar");
  // const [calendar, setCalendar] = useState([]);

  // const holidays = JSON.parse(localStorage.getItem("holidays"));

  // const availableLeaves = JSON.parse(localStorage.getItem("vacationDays"));

  // const holidayDates = holidays.length
  //   ? holidays.map((holiday) => holiday.observed)
  //   : JSON.parse(localStorage.getItem("holidays")).map(
  //       (holiday) => holiday.observed
  //     );

  // useEffect(() => {
  //   const country = JSON.parse(localStorage.getItem("holidays"))[0].country;
  //   if (localStorage.getItem(`calendar:${country}`)) {
  //     setCalendar(JSON.parse(localStorage.getItem(`calendar:${country}`)));
  //     return;
  //   }

  //   HolidayAPI.getCalendar(availableLeaves, holidayDates).then((calendar) => {
  //     setCalendar(calendar);
  //     localStorage.setItem(`calendar:${country}`, JSON.stringify(calendar));
  //   });
  // }, []);

  // const pickedDays = calendar
  //   .filter((day) => day.algo == 1)
  //   .map((day) => day.date);
  // const weekendDates = calendar
  //   .filter((day) => day.algoWeekend == 1)
  //   .map((day) => day.date);

  return (
    <>
      <div className="CalendarContainer">
        <Navbar></Navbar>
        <Calendar
          onClickDay={(value, event) => console.log(value)}
          maxDate={new Date("12/31/2024")}
          minDate={new Date("01/01/2023")}
        ></Calendar>
        <Holidays></Holidays>
      </div>
    </>
  );
}
