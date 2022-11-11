//Icons
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CelebrationIcon from "@mui/icons-material/Celebration";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import "./../SideMenu/SideMenu.css";

export default function Hero() {
  return (
    <div className="menuContainer">
      <div className="brand">DaysOff</div>
      <div className="controls">
        <div className="home">
          <HomeIcon className="homeIcon" color="action" />
          Dashboard
        </div>
        <div className="calendar">
          <CalendarMonthIcon className="calendarIcon" color="action" />
          Calendar
        </div>
        <div className="holidays">
          <CelebrationIcon className="holidayIcon" color="action" />
          Holidays
        </div>
        <div className="analytics">
          <EqualizerIcon className="analyticsIcon" color="action" />
          Analytics
        </div>
      </div>
    </div>
  );
}
