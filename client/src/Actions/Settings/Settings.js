import "./Settings.css";
import User from "../../Components/User/User";
import UserInputs from "./UserInputs/UserInputs";

export default function Settings({
  countries,
  languages,
  country,
  region,
  PTO,
  startDate,
  endDate,
  weekends,
  holidayLanguage,
  setCountry,
  setRegion,
  setPTO,
  setStartDate,
  setEndDate,
  setWeekends,
  setHolidayLanguage,
}) {
  return (
    <>
      <div className="settingsContainer">
        <User />
        <UserInputs
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
      </div>
    </>
  );
}
