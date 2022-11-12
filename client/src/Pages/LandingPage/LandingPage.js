import "../LandingPage/LandingPage.css";
import Form from "./../../Components/Form/Form";
import Navbar from "./../../Components//Navbar/Navbar";
import Hero from "./../../Components/Hero/Hero";

export default function LandingPage({ countries, setHolidays }) {
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="presentation">
          <Hero></Hero>
          <Form countries={countries} setHolidays={setHolidays}></Form>
        </div>
        <img src={require("./../../Assets/HeroImg.png")} />
      </div>
    </>
  );
}
