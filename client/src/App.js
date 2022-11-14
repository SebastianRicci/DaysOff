import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HolidayAPI } from "./HolidayAPI/HolidayAPI";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Dashboard from "./Pages/Dashboard/Dashboard";

function App() {
  const [countries, setCountries] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [vacationDays, setVacationDays] = useState();

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
              <LandingPage
                countries={countries}
                setHolidays={setHolidays}
                setVacationDays={setVacationDays}
              />
            }
          />
          <Route
            path="/Calendar"
            element={
              <Dashboard holidays={holidays} vacationDays={vacationDays} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
