import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HolidayAPI } from "./HolidayAPI/HolidayAPI";
import LandingPage from "./Pages/LandingPage/LandingPage";
import CalendarPage from "./Pages/CalendarPage/CalendarPage";

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
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage countries={countries} setHolidays={setHolidays} />
            }
          />
          <Route
            path="/Calendar"
            element={<CalendarPage holidays={holidays} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
