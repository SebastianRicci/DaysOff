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
  const [country, setCountry] = useState({
    code: "ES",
    name: "Spain",
    codes: {
      "alpha-2": "ES",
      "alpha-3": "ESP",
      numeric: "724",
    },
    languages: ["ca", "es", "eu", "gl"],
    currencies: [
      {
        alpha: "EUR",
      },
    ],
    flag: "https://flagsapi.com/ES/flat/64.png",
    subdivisions: [
      {
        code: "ES-AN",
        name: "Andalucía",
        languages: ["es"],
      },
      {
        code: "ES-AR",
        name: "Aragón",
        languages: ["es"],
      },
      {
        code: "ES-AS",
        name: "Asturias, Principado de",
        languages: ["es"],
      },
      {
        code: "ES-CB",
        name: "Cantabria",
        languages: ["es"],
      },
      {
        code: "ES-CE",
        name: "Ceuta",
        languages: ["es"],
      },
      {
        code: "ES-CL",
        name: "Castilla y León",
        languages: ["es"],
      },
      {
        code: "ES-CM",
        name: "Castilla-La Mancha",
        languages: ["es"],
      },
      {
        code: "ES-CN",
        name: "Canarias",
        languages: ["es"],
      },
      {
        code: "ES-CT",
        name: "Catalunya",
        languages: ["ca"],
      },
      {
        code: "ES-EX",
        name: "Extremadura",
        languages: ["es"],
      },
      {
        code: "ES-GA",
        name: "Galicia",
        languages: ["gl"],
      },
      {
        code: "ES-IB",
        name: "Illes Balears",
        languages: ["ca"],
      },
      {
        code: "ES-MC",
        name: "Murcia, Región de",
        languages: ["es"],
      },
      {
        code: "ES-MD",
        name: "Madrid, Comunidad de",
        languages: ["es"],
      },
      {
        code: "ES-ML",
        name: "Melilla",
        languages: ["es"],
      },
      {
        code: "ES-NC",
        name: "Nafarroako Foru Komunitatea*",
        languages: ["es", "eu"],
      },
      {
        code: "ES-PV",
        name: "Euskal Herria",
        languages: ["es", "eu"],
      },
      {
        code: "ES-RI",
        name: "La Rioja",
        languages: ["es"],
      },
      {
        code: "ES-VC",
        name: "Valenciana, Comunidad",
        languages: ["ca", "es"],
      },
    ],
  });
  const [region, setRegion] = useState({
    code: "ES-MD",
    name: "Madrid, Comunidad de",
    languages: ["es"],
  });
  const [PTO, setPTO] = useState("");
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment(`${moment().year()}-12-31`));
  const [weekends, setWeekends] = useState(["6", "0"]);
  const [holidayLanguage, setHolidayLanguage] = useState("en");
  console.log(country);
  console.log(region);
  region ? console.log(region) : console.log(country);
  function renderAction(action) {
    switch (action) {
      case 0:
        return (
          <CalendarView
            country={country}
            region={region}
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
            country={country}
            region={region}
            PTO={PTO}
            startDate={startDate}
            endDate={endDate}
            weekends={weekends}
            holidayLanguage={holidayLanguage}
            setCountry={setCountry}
            setRegion={setRegion}
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
