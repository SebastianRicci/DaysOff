import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import CalendarView from "../Actions/CalendarView/CalendarView";
import TripsView from "../Actions/TripsView/TripsView";
import AnalyticsView from "../Actions/AnalyticsView/AnalyticsView";
import OnboardingView from "../Actions/OnboardingView/OnboardingView";
import BottomNav from "../Components/BottomNav/BottomNav";
import Header from "../Components/Header/Header";
import Settings from "../Actions/Settings/Settings";
import moment from "moment";
import { HolidayAPI } from "../HolidayAPI/HolidayAPI";

export default function Dashboard() {
  //Navigation
  const [onboarding, setOnboarding] = useState(true);
  const [action, setAction] = useState(0);
  const [settings, setSettings] = useState(false);

  //Countries and Languages Data on Mount
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    const getCountries = async () => {
      const countries = await HolidayAPI.getCountries();
      setCountries(countries);
    };
    getCountries();
    const getLanguages = async () => {
      const languages = await HolidayAPI.getLanguages();
      setLanguages(languages);
    };
    getLanguages();
  }, []);

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
  const [holidays, setHolidays] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [overview, setOverview] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [trips, setTrips] = useState([]);

  //Set default holidays to be displayed (Madrid)
  useEffect(() => {
    let location = region ? region.code : country.code;
    async function fetchData() {
      const response = await HolidayAPI.getHolidays(
        location,
        holidayLanguage.code,
        startDate,
        endDate
      );
      setHolidays(response);
    }
    fetchData();
  }, []);

  //Set holiday data whenever location, start date, end date or language changes
  useEffect(() => {
    let location = region ? region.code : country.code;
    async function fetchData() {
      const response = await HolidayAPI.getHolidays(
        location,
        holidayLanguage.code,
        startDate,
        endDate
      );
      setHolidays(response);
    }
    fetchData();
  }, [country, region, startDate, endDate, holidayLanguage]);

  //Reset calendar, overview, analytics and trips everytime location is changed
  useEffect(() => {
    setCalendar([]);
    setOverview([]);
    setAnalytics({});
    setTrips([]);
  }, [country, region]);

  //Scrolls to top of page on render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [action]);

  function renderAction(action) {
    switch (action) {
      case 0:
        return (
          <CalendarView
            setTrips={setTrips}
            setAnalytics={setAnalytics}
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
        return <TripsView trips={trips} />;
      case 2:
        return <AnalyticsView analytics={analytics} />;
    }
  }

  return (
    <>
      {onboarding ? (
        <OnboardingView setOnboarding={setOnboarding} />
      ) : (
        <div className="Dashboard">
          <Header
            action={action}
            setSettings={setSettings}
            settings={settings}
          />
          {settings ? (
            <Settings
              countries={countries}
              languages={languages}
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
          <BottomNav action={action} setAction={setAction} />
        </div>
      )}
    </>
  );
}
