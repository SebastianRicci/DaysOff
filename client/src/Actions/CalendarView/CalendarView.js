import "./CalendarView.css";
import { useState } from "react";
import Holidays from "../../Components/Holidays/Holidays";
import MonthCalendar from "../../Components/MonthCalendar/MonthCalendar";
import CalendarOverview from "../../Components/CalendarOverview/CalendarOverview";
import Fab from "@mui/material/Fab";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarModal from "../../Components/CalendarModal/CalendarModal";

export default function CalendarView({
  holidays,
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
  const [activeDate, setActiveDate] = useState(startDate._d);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [choices, setChoices] = useState([]);

  return (
    <div className="CalendarContainer">
      <CalendarModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedDate={selectedDate}
        choices={choices}
        setChoices={setChoices}
      />
      <MonthCalendar
        choices={choices}
        setOpenModal={setOpenModal}
        setActiveDate={setActiveDate}
        holidays={holidays}
        startDate={startDate}
        endDate={endDate}
        weekends={weekends}
        setSelectedDate={setSelectedDate}
      ></MonthCalendar>
      <Holidays activeDate={activeDate} holidays={holidays}></Holidays>
      <CalendarOverview></CalendarOverview>
      <Fab
        variant="extended"
        style={style}
        onClick={() => console.log("Hello")}
      >
        <CalendarMonthIcon sx={{ mr: 1 }} />
        Optimize
      </Fab>
    </div>
  );
}
