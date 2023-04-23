import "./UserInputs.css";
import LocationInput from "./LocationInput/LocationInput";
import PTOInput from "./PTOInput/PTOInput";
import CalendarDatesInput from "./CalendarDatesInput/CalendarDatesInput";
import WeekendsInput from "./WeekendsInput/WeekendsInput";
import HolidayLanguageInput from "./HolidayLanguageInput/HolidayLanguageInput";

export default function UserInputs({
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
    <div className="settingsBody">
      <LocationInput location={location} setLocation={setLocation} />
      <PTOInput PTO={PTO} setPTO={setPTO} />
      <CalendarDatesInput
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <WeekendsInput weekends={weekends} setWeekends={setWeekends} />
      <HolidayLanguageInput
        holidayLanguage={holidayLanguage}
        setHolidayLanguage={setHolidayLanguage}
      />
    </div>
  );
}
