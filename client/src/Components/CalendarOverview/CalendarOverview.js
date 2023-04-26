import "./CalendarOverview.css";
import TextField from "@mui/material/TextField";
export default function CalendarOverview({ overview }) {
  return (
    <div className="OverviewContainer">
      <h3>Calendar Overview</h3>
      <div className="TextFieldContainer">
        <TextField
          value={overview.join("\n\n")}
          multiline
          rows={overview.length * 2}
          readOnly
          fullWidth
          placeholder="Click on optimize to take a look at your calendar overview"
          InputProps={{
            readOnly: true,
          }}
        ></TextField>
      </div>
    </div>
  );
}
