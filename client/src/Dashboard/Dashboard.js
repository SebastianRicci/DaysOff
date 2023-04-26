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
  //Navigation
  const [action, setAction] = useState(0);
  const [settings, setSettings] = useState(false);
  //User Inputs
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
  //  FIX: useState(moment());
  const [startDate, setStartDate] = useState(moment("2022-01-01"));
  // FIX: useState(moment(`${moment().year()}-12-31`));
  const [endDate, setEndDate] = useState(moment("2022-12-31"));
  const [weekends, setWeekends] = useState(["6", "0"]);
  const [holidayLanguage, setHolidayLanguage] = useState({
    code: "es",
    name: "Spanish, Castilian",
  });
  const [choices, setChoices] = useState([]);
  //API Data
  const [holidays, setHolidays] = useState([
    {
      name: "Día de Año Nuevo",
      date: "2022-01-01",
      observed: "2022-01-01",
      public: true,
      country: "ES-MD",
      uuid: "c425b20b-749e-426a-bf67-3bb2ff996456",
      weekday: {
        date: {
          name: "Saturday",
          numeric: "6",
        },
        observed: {
          name: "Saturday",
          numeric: "6",
        },
      },
    },
    {
      name: "Epifanía",
      date: "2022-01-06",
      observed: "2022-01-06",
      public: true,
      country: "ES-MD",
      uuid: "cfd84af7-b6ed-4a40-b02b-361985af9e3b",
      weekday: {
        date: {
          name: "Thursday",
          numeric: "4",
        },
        observed: {
          name: "Thursday",
          numeric: "4",
        },
      },
    },
    {
      name: "Dia de san josé",
      date: "2022-03-19",
      observed: "2022-03-19",
      public: true,
      country: "ES-MD",
      uuid: "7be2f835-d758-479d-8315-89a964c66987",
      weekday: {
        date: {
          name: "Saturday",
          numeric: "6",
        },
        observed: {
          name: "Saturday",
          numeric: "6",
        },
      },
    },
    {
      name: "Jueves Santo",
      date: "2022-04-14",
      observed: "2022-04-14",
      public: true,
      country: "ES-MD",
      uuid: "04c0382e-d0e3-4f3d-960c-423306990517",
      weekday: {
        date: {
          name: "Thursday",
          numeric: "4",
        },
        observed: {
          name: "Thursday",
          numeric: "4",
        },
      },
    },
    {
      name: "Buen viernes",
      date: "2022-04-15",
      observed: "2022-04-15",
      public: true,
      country: "ES-MD",
      uuid: "b2312e00-37b8-4621-bc08-dddd28af5376",
      weekday: {
        date: {
          name: "Friday",
          numeric: "5",
        },
        observed: {
          name: "Friday",
          numeric: "5",
        },
      },
    },
    {
      name: "Día laboral",
      date: "2022-05-01",
      observed: "2022-05-02",
      public: true,
      country: "ES-MD",
      uuid: "bb16baec-689d-4540-b7d6-c58092e24584",
      weekday: {
        date: {
          name: "Sunday",
          numeric: "7",
        },
        observed: {
          name: "Monday",
          numeric: "1",
        },
      },
    },
    {
      name: "Día de Madrid",
      date: "2022-05-02",
      observed: "2022-05-02",
      public: true,
      country: "ES-MD",
      uuid: "bfef6fc3-039e-4861-b248-ef442bfeda75",
      weekday: {
        date: {
          name: "Monday",
          numeric: "1",
        },
        observed: {
          name: "Monday",
          numeric: "1",
        },
      },
    },
    {
      name: "Fiesta de San Isidoro",
      date: "2022-05-15",
      observed: "2022-05-16",
      public: true,
      country: "ES-MD",
      uuid: "e2b0b23e-5932-4ded-8060-420737afae82",
      weekday: {
        date: {
          name: "Sunday",
          numeric: "7",
        },
        observed: {
          name: "Monday",
          numeric: "1",
        },
      },
    },
    {
      name: "Asunción de María",
      date: "2022-08-15",
      observed: "2022-08-15",
      public: true,
      country: "ES-MD",
      uuid: "5e759f78-a46a-485e-9cd2-71fce2cf9d47",
      weekday: {
        date: {
          name: "Monday",
          numeric: "1",
        },
        observed: {
          name: "Monday",
          numeric: "1",
        },
      },
    },
    {
      name: "Día de la herencia hispana",
      date: "2022-10-12",
      observed: "2022-10-12",
      public: true,
      country: "ES-MD",
      uuid: "cb06098e-2d9f-4d15-8bba-e6c91bd2fc2f",
      weekday: {
        date: {
          name: "Wednesday",
          numeric: "3",
        },
        observed: {
          name: "Wednesday",
          numeric: "3",
        },
      },
    },
    {
      name: "Todos los Santos",
      date: "2022-11-01",
      observed: "2022-11-01",
      public: true,
      country: "ES-MD",
      uuid: "d166f219-3ed0-4768-944e-79128d465151",
      weekday: {
        date: {
          name: "Tuesday",
          numeric: "2",
        },
        observed: {
          name: "Tuesday",
          numeric: "2",
        },
      },
    },
    {
      name: "Nuestra Señora de la Almudena",
      date: "2022-11-09",
      observed: "2022-11-09",
      public: true,
      country: "ES-MD",
      uuid: "c1eb3c24-34de-48b2-a386-50d4e7eee2aa",
      weekday: {
        date: {
          name: "Wednesday",
          numeric: "3",
        },
        observed: {
          name: "Wednesday",
          numeric: "3",
        },
      },
    },
    {
      name: "Dia de la constitucion",
      date: "2022-12-06",
      observed: "2022-12-06",
      public: true,
      country: "ES-MD",
      uuid: "2460ee0b-2aed-49c5-9cb4-c6d76dda8f9b",
      weekday: {
        date: {
          name: "Tuesday",
          numeric: "2",
        },
        observed: {
          name: "Tuesday",
          numeric: "2",
        },
      },
    },
    {
      name: "Fiesta de la Inmaculada Concepción",
      date: "2022-12-08",
      observed: "2022-12-08",
      public: true,
      country: "ES-MD",
      uuid: "1a260fc0-f7bf-4d17-8fe1-7ad9bf381e15",
      weekday: {
        date: {
          name: "Thursday",
          numeric: "4",
        },
        observed: {
          name: "Thursday",
          numeric: "4",
        },
      },
    },
    {
      name: "día de Navidad",
      date: "2022-12-25",
      observed: "2022-12-26",
      public: true,
      country: "ES-MD",
      uuid: "53d85ca5-a9e9-4e6e-b5f2-b43acdf4ab09",
      weekday: {
        date: {
          name: "Sunday",
          numeric: "7",
        },
        observed: {
          name: "Monday",
          numeric: "1",
        },
      },
    },
  ]);
  const [calendar, setCalendar] = useState([]);
  const [overview, setOverview] = useState([]);

  function renderAction(action) {
    switch (action) {
      case 0:
        return (
          <CalendarView
            overview={overview}
            setOverview={setOverview}
            calendar={calendar}
            setCalendar={setCalendar}
            choices={choices}
            setChoices={setChoices}
            holidays={holidays}
            PTO={PTO}
            startDate={startDate}
            endDate={endDate}
            weekends={weekends}
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
