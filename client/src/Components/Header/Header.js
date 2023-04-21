import "./Header.css";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardDrawer from "../DashboardDrawer/DashboardDrawer";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Navbar({ action, setSettings, settings }) {
  function renderTitle(action) {
    switch (action) {
      case 0:
        return "Optimized Calendar 🎉";
      case 1:
        return "Trip Recommendations";
      case 2:
        return "Holiday Analytics";
    }
  }
  return (
    <>
      {settings ? (
        <div className="settingsHeader">
          <div className="settingsSelections">
            <ArrowBackIosIcon
              color="white"
              onClick={() => {
                setSettings(false);
              }}
            />
            <h3>Settings</h3>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="dashboardHeader">
          <div className="selections">
            <p>Logo</p>
            <h3>{renderTitle(action)}</h3>
            <SettingsIcon
              color="white"
              onClick={() => {
                setSettings(true);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
