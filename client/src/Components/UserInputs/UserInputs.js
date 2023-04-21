import "./UserInputs.css";
import { useState } from "react";
import LocationInput from "../LocationInput/LocationInput";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import dayjs from "dayjs";
import PublicIcon from "@mui/icons-material/Public";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CelebrationIcon from "@mui/icons-material/Celebration";
import TranslateIcon from "@mui/icons-material/Translate";

export default function UserInputs() {
  const [formats, setFormats] = useState(["Saturday", "Sunday"]);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };
  return (
    <div className="settingsBody">
      <div className="Location">
        <div className="LocationHeader">
          <PublicIcon />
          Location
        </div>
        <LocationInput />
      </div>

      <div className="VacationDays">
        <div className="VacationDaysHeader">
          <BeachAccessIcon />
          Number of vacation days
        </div>
        <TextField
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          label="Available PTO"
          type="number"
        />
      </div>

      <div className="CalendarDates">
        <div className="CalendarDatesHeader">
          <DateRangeIcon />
          Choose your calendar range
        </div>
        <div className="CalendarDatesRange">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDatePicker
              width="500%"
              label="Start date"
              inputFormat="DD/MM/YYYY"
              defaultValue={dayjs()}
            />
            <MobileDatePicker
              width="50%"
              label="End date"
              inputFormat="DD/MM/YYYY"
              defaultValue={dayjs()}
            />
          </LocalizationProvider>
        </div>
      </div>

      <div className="Weekends">
        <div className="WeekendsHeader">
          <CelebrationIcon />
          Weekends
        </div>
        <ToggleButtonGroup
          value={formats}
          onChange={handleFormat}
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

      <div className="HolidayLanguage">
        <div className="HolidayLanguageHeader">
          <TranslateIcon />
          Holiday Language
        </div>
        <TextField />
      </div>
    </div>
  );
}
