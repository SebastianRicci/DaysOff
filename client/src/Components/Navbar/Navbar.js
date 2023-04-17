import "./Navbar.css";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import ToggleButtons from "../ToggleButton/ToggleButton";

export default function Navbar({ setView, exportCalendar }) {
  return (
    <div className="calendarNavbar">
      <div className="selections">
        <MenuSharpIcon color="action"></MenuSharpIcon>
        <h3>Optimized Calendar 🎉</h3>
        <SettingsIcon color="action"></SettingsIcon>
      </div>
    </div>
  );
}
