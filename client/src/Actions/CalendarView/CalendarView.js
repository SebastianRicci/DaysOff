import "./CalendarView.css";
import Holidays from "../../Components/Holidays/Holidays";
import MonthCalendar from "../../Components/MonthCalendar/MonthCalendar";
import CalendarOverview from "../../Components/CalendarOverview/CalendarOverview";
import Fab from "@mui/material/Fab";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function CalendarView({
  location,
  PTO,
  startDate,
  endDate,
  weekends,
  holidayLanguage,
}) {
  const style = {
    background: "#fd1079",
    color: "white",
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 80,
    left: "auto",
    position: "fixed",
  };
  return (
    <div className="CalendarContainer">
      <MonthCalendar
        startDate={startDate}
        endDate={endDate}
        weekends={weekends}
      ></MonthCalendar>
      <Holidays></Holidays>
      <CalendarOverview></CalendarOverview>
      <Fab variant="extended" style={style}>
        <CalendarMonthIcon sx={{ mr: 1 }} />
        Optimize
      </Fab>
    </div>
  );
}
