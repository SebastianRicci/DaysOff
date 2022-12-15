import "../LandingPage/LandingPage.css";
import Form from "./../../Components/Form/Form";
import Navbar from "./../../Components//Navbar/Navbar";
import Hero from "./../../Components/Hero/Hero";
import React, { useState, useEffect } from "react";
import { HolidayAPI } from "./../../HolidayAPI/HolidayAPI";

export default function LandingPage() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    localStorage.clear();
    HolidayAPI.getCountries().then((request) =>
      setCountries(request.countries)
    );
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="presentation">
          <Hero></Hero>
          <Form countries={countries}></Form>
        </div>
        <img src={require("./../../Assets/HeroImg.png")} />
      </div>
    </>
  );
}
