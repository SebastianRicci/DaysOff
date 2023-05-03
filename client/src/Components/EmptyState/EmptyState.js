import "./EmptyState.css";
import AddchartIcon from "@mui/icons-material/Addchart";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";

export default function EmptyState({ state }) {
  return (
    <div className="emptyState">
      <h1>No {state} found</h1>
      <div className="emptyStateIcon">
        {state === "Analytics" ? <AddchartIcon /> : <ModeOfTravelIcon />}
      </div>
      <p>
        You can start by clicking on the <strong>Calendar</strong> tab and
        optimizing your days off first!
      </p>
    </div>
  );
}
