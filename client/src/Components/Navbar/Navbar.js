import "./Navbar.css";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import ToggleButtons from "../ToggleButton/ToggleButton";
import Drawer from "../Drawer/Drawer";

export default function Navbar({ setView, exportCalendar }) {
  return (
    <div className="calendarNavbar">
      <div className="selections">
        <MenuSharpIcon color="white"></MenuSharpIcon>
        <h3>Optimized Calendar 🎉</h3>
        <SettingsIcon color="white"></SettingsIcon>
      </div>
    </div>
  );
}
