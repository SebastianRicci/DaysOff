import TextField from "@mui/material/TextField";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

export default function PTOInput({ PTO, setPTO }) {
  const handlePTO = (event, newPTO) => {
    setPTO(event.target.value);
  };

  return (
    <div className="VacationDays">
      <div className="VacationDaysHeader">
        <BeachAccessIcon />
        Number of vacation days
      </div>
      <TextField
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        label="Available PTO"
        type="number"
        value={PTO}
        onChange={handlePTO}
      />
    </div>
  );
}
