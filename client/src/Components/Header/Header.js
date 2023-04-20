import "./Header.css";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardDrawer from "../DashboardDrawer/DashboardDrawer";

export default function Navbar({ action }) {
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
    <div className="dashboardHeader">
      <div className="selections">
        <DashboardDrawer></DashboardDrawer>
        <h3>{renderTitle(action)}</h3>
        <SettingsIcon color="white"></SettingsIcon>
      </div>
    </div>
  );
}
