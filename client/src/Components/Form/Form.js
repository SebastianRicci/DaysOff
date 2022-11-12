import "./Form.css";
import { useState } from "react";
import { HolidayAPI } from "../../HolidayAPI/HolidayAPI";
import { useNavigate } from "react-router-dom";

export default function Form({ countries, setHolidays }) {
  const [selectedCountry, setSelectedCountry] = useState();
  let navigate = useNavigate();

  async function handleSubmit(event) {
    //Prevent default on submission
    event.preventDefault();
    //Collect form values
    const country = event.target.country.value;
    const region = event.target.region && event.target.region.value;
    //If the country has no regions choose country code else choose region code e.g Madrid,Spain => ES-MD, Aruba => AW
    const location = region || country;
    //Fetch bank holidays from API
    const locationHolidays = await HolidayAPI.getHolidays(location);
    //Filter by non-working holidays (public=true) and set as state
    setHolidays(
      locationHolidays.holidays.filter((holiday) => holiday.public == true)
    );
    navigate("/Calendar");
  }

  async function handleChange(event) {
    //Prevent default on submission
    event.preventDefault();
    //Collect form values
    setSelectedCountry(event.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="leftSide">
          <h1>Choose your location</h1>
          <p>Country:</p>
          <div className="submit-input-align">
            <select id="country" name="country" onChange={handleChange}>
              {countries.map((country) => (
                <option value={country.code}>{country.name}</option>
              ))}
            </select>
            <div className="rightSide">
              <input name="btn" id="btn" type="submit" />
            </div>
          </div>
          {selectedCountry &&
          countries.filter((country) => country.code === selectedCountry)[0]
            .subdivisions.length ? (
            <>
              <p>Region:</p>
              <select id="region" name="region">
                {countries
                  .filter((country) => country.code === selectedCountry)[0]
                  .subdivisions.map((region) => (
                    <option value={region.code}>{region.name}</option>
                  ))}
              </select>
            </>
          ) : (
            <></>
          )}
        </div>
      </form>
    </>
  );
}
