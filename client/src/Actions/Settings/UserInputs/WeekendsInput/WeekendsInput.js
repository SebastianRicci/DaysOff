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
        <ToggleButton value="1" aria-label="Monday">
          M
        </ToggleButton>
        <ToggleButton value="2" aria-label="Tuesday">
          T
        </ToggleButton>
        <ToggleButton value="3" aria-label="Wednesday">
          W
        </ToggleButton>
        <ToggleButton value="4" aria-label="Thursday">
          T
        </ToggleButton>
        <ToggleButton value="5" aria-label="Friday">
          F
        </ToggleButton>
        <ToggleButton value="6" aria-label="Saturday">
          S
        </ToggleButton>
        <ToggleButton value="0" aria-label="Sunday">
          S
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
