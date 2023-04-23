import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CelebrationIcon from "@mui/icons-material/Celebration";

export default function WeekendsInput({ weekends, setWeekends }) {
  const handleWeekend = (event, newWeekends) => {
    setWeekends(newWeekends);
  };
  return (
    <div className="Weekends">
      <div className="WeekendsHeader">
        <CelebrationIcon />
        Weekends
      </div>
      <ToggleButtonGroup
        value={weekends}
        onChange={handleWeekend}
        aria-label="Days of the week"
      >
        <ToggleButton value="Monday" aria-label="Monday">
          M
        </ToggleButton>
        <ToggleButton value="Tuesday" aria-label="Tuesday">
          T
        </ToggleButton>
        <ToggleButton value="Wednesday" aria-label="Wednesday">
          W
        </ToggleButton>
        <ToggleButton value="Thursday" aria-label="Thursday">
          T
        </ToggleButton>
        <ToggleButton value="Friday" aria-label="Friday">
          F
        </ToggleButton>
        <ToggleButton value="Saturday" aria-label="Saturday">
          S
        </ToggleButton>
        <ToggleButton value="Sunday" aria-label="Sunday">
          S
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
