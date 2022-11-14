import "../LandingPage/LandingPage.css";
import Form from "./../../Components/Form/Form";
import Navbar from "./../../Components//Navbar/Navbar";
import Hero from "./../../Components/Hero/Hero";

export default function LandingPage({
  countries,
  setHolidays,
  setVacationDays,
}) {
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="presentation">
          <Hero></Hero>
          <Form
            countries={countries}
            setHolidays={setHolidays}
            setVacationDays={setVacationDays}
          ></Form>
        </div>
        <img src={require("./../../Assets/HeroImg.png")} />
      </div>
    </>
  );
}
