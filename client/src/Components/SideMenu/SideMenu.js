//Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CelebrationIcon from "@mui/icons-material/Celebration";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import Legend from "../Legend/Legend";
import "./SideMenu.css";

export default function SideMenu({ action, setAction }) {
  return (
    <div className="menuContainer">
      <div className="brand">DaysOff</div>
      <div className="controls">
        <div className="calendar" onClick={() => setAction("Calendar")}>
          <CalendarMonthIcon className="calendarIcon" color="action" />
          Calendar
        </div>
        <div className="holidays" onClick={() => setAction("Holidays")}>
          <CelebrationIcon className="holidayIcon" color="action" />
          Holidays
        </div>
        <div className="analytics" onClick={() => setAction("Analytics")}>
          <EqualizerIcon className="analyticsIcon" color="action" />
          Analytics
        </div>
        {action == "Calendar" && <Legend />}
      </div>
    </div>
  );
}
