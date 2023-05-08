import "./UserInputs.css";
import LocationInput from "./LocationInput/LocationInput";
import PTOInput from "./PTOInput/PTOInput";
import CalendarDatesInput from "./CalendarDatesInput/CalendarDatesInput";
import WeekendsInput from "./WeekendsInput/WeekendsInput";
import HolidayLanguageInput from "./HolidayLanguageInput/HolidayLanguageInput";

export default function UserInputs({
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
    <div className="settingsBody">
      <LocationInput
        countries={countries}
        country={country}
        setCountry={setCountry}
        region={region}
        setRegion={setRegion}
      />
      <PTOInput PTO={PTO} setPTO={setPTO} />
      <CalendarDatesInput
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <WeekendsInput weekends={weekends} setWeekends={setWeekends} />
      <HolidayLanguageInput
        languages={languages}
        holidayLanguage={holidayLanguage}
        setHolidayLanguage={setHolidayLanguage}
      />
    </div>
  );
}
