import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import { HolidayAPI } from "../HolidayAPI/HolidayAPI";
import CalendarView from "../Actions/CalendarView/CalendarView";
import BottomNav from "../Components/BottomNav/BottomNav";
import Header from "../Components/Header/Header";

export default function Dashboard() {
  const [action, setAction] = useState(0);
  const [settings, setSettings] = useState(false);

  function renderAction(action) {
    switch (action) {
      case 0:
        return <CalendarView></CalendarView>;
      case 1:
        return <h1>AI</h1>;
      case 2:
        return <h1>stats</h1>;
    }
  }
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
      <div className="Dashboard">
        <Header
          action={action}
          setSettings={setSettings}
          settings={settings}
        ></Header>
        {settings ? <h1>settings</h1> : renderAction(action)}
      </div>
      <BottomNav action={action} setAction={setAction}></BottomNav>
    </>
  );
}
