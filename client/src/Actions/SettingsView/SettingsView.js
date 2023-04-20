import "./Settings.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Settings() {
  return (
    <>
      <div className="settingsContainer">
        <div className="settingsHeader">
          <ArrowBackIosIcon></ArrowBackIosIcon>
        </div>
        <div className="settingsBody">
          <div className="Location">
            <div>Location</div>
            <div>Location Input</div>
          </div>
          <div className="VacationDays">
            <div>VacationDays</div>
            <div>VacationDays Input</div>
          </div>
          <div className="CalendarDates">
            <div>CalendarDates</div>
            <div>CalendarDates Input</div>
          </div>
          <div className="HolidayLanguage">
            <div>HolidayLanguage</div>
            <div>HolidayLanguage Input</div>
          </div>
          <div className="Weekends">
            <div>Weekends</div>
            <div>Weekends Input</div>
          </div>
        </div>
      </div>
    </>
  );
}
