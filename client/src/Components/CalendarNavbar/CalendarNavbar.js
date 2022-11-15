import "./CalendarNavbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import ToggleButtons from "../ToggleButton/ToggleButton";

export default function CalendarNavbar({ setView, exportCalendar }) {
  return (
    <>
      <div className="calendarNavbar">
        <div className="selectionsCalendar">
          <div className="menuView">
            <div>
              <ToggleButtons setView={setView} />
            </div>
          </div>
          <div className="actions">
            <div onClick={() => exportCalendar()}>
              <AttachEmailIcon />
            </div>
            <div>
              <SettingsIcon />
            </div>
            <div>
              <AccountCircleIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
