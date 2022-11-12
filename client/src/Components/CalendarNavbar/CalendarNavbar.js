import "./CalendarNavbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import MenuIcon from "@mui/icons-material/Menu";

export default function CalendarNavbar() {
  return (
    <>
      <div className="calendarNavbar">
        <div className="selections">
          <div className="menuView">
            <MenuIcon />
            <div>Month view</div>
          </div>
          <div className="actions">
            <div>
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
