import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import { HolidayAPI } from "../HolidayAPI/HolidayAPI";
import CalendarView from "../Actions/CalendarView/CalendarView";
import BottomNav from "../Components/BottomNav/BottomNav";
import Header from "../Components/Header/Header";
import Settings from "../Actions/Settings/Settings";
import moment from "moment";

export default function Dashboard() {
  const [action, setAction] = useState(0);
  const [settings, setSettings] = useState(false);
  const [location, setLocation] = useState("");
  const [PTO, setPTO] = useState("");
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment(`${moment().year()}-12-31`));
  const [weekends, setWeekends] = useState(["Saturday", "Sunday"]);
  const [holidayLanguage, setHolidayLanguage] = useState("en");

  function renderAction(action) {
    switch (action) {
      case 0:
        return (
          <CalendarView
            location={location}
            PTO={PTO}
            startDate={startDate}
            endDate={endDate}
            weekends={weekends}
            holidayLanguage={holidayLanguage}
          ></CalendarView>
        );
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
        {settings ? (
          <Settings
            location={location}
            PTO={PTO}
            startDate={startDate}
            endDate={endDate}
            weekends={weekends}
            holidayLanguage={holidayLanguage}
            setLocation={setLocation}
            setPTO={setPTO}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setWeekends={setWeekends}
            setHolidayLanguage={setHolidayLanguage}
          />
        ) : (
          renderAction(action)
        )}
      </div>
      <BottomNav action={action} setAction={setAction}></BottomNav>
    </>
  );
}
