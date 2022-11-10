import "../LandingPage/LandingPage.css";
import CountryForm from "./../../Components/CountryForm/CountryForm";
import Navbar from "./../../Components//Navbar/Navbar";
import Hero from "./../../Components/Hero/Hero";

export default function LandingPage({ countries, setHolidays }) {
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="presentation">
          <Hero></Hero>
          <CountryForm
            countries={countries}
            setHolidays={setHolidays}
          ></CountryForm>
        </div>
        <img src={require("./../../Assets/HeroImg.png")} />
      </div>
    </>
  );
}
