import "./App.css";
import React, { useState, useEffect } from "react";
import { HolidayAPI } from "./HolidayAPI/HolidayAPI";
import LandingPage from "./Pages/LandingPage/LandingPage";

function App() {
  const [countries, setCountries] = useState([]);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    HolidayAPI.getCountries().then((request) =>
      setCountries(request.countries)
    );
  }, []);
  return (
    <>
      <LandingPage
        countries={countries}
        setHolidays={setHolidays}
      ></LandingPage>
    </>
  );
}

export default App;
