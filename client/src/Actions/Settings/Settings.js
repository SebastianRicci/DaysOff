import "./Settings.css";
import User from "../../Components/User/User";
import UserInputs from "./UserInputs/UserInputs";

export default function Settings({
  location,
  PTO,
  startDate,
  endDate,
  weekends,
  holidayLanguage,
  setLocation,
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
          location={location}
          PTO={PTO}
          startDate={startDate}
          endDate={endDate}
          weekends={weekends}
          holidayLanguage={holidayLanguage}
          setLocation={setLocation}
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
