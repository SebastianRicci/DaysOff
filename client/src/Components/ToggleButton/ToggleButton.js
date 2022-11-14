import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleButtons({ view, setView }) {
  const handleView = (event, newView) => {
    setView(newView);
  };

  return (
    <ToggleButtonGroup value={view} exclusive onChange={handleView}>
      <ToggleButton value="Monthly" aria-label="left aligned">
        Monthly
      </ToggleButton>
      <ToggleButton value="Yearly" aria-label="centered">
        Yearly
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
