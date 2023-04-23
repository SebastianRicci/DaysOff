import DateRangeIcon from "@mui/icons-material/DateRange";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export default function CalendarDatesInput({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  return (
    <div className="CalendarDates">
      <div className="CalendarDatesHeader">
        <DateRangeIcon />
        Choose your calendar range
      </div>
      <div className="CalendarDatesRange">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <MobileDatePicker
            width="50%"
            value={startDate}
            onChange={(newStartDate) => setStartDate(newStartDate)}
            label="Start date"
            inputFormat="DD/MM/YYYY"
            format="DD/MM/YYYY"
          />
          <MobileDatePicker
            width="50%"
            value={endDate}
            onChange={(newEndDate) => setEndDate(newEndDate)}
            label="End date"
            inputFormat="DD/MM/YYYY"
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}
