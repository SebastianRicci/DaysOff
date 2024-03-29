import "./CalendarView.css";
import { HolidayAPI } from "../../HolidayAPI/HolidayAPI";
import { useState } from "react";
import Holidays from "../../Components/Holidays/Holidays";
import MonthCalendar from "../../Components/MonthCalendar/MonthCalendar";
import CalendarOverview from "../../Components/CalendarOverview/CalendarOverview";
import Fab from "@mui/material/Fab";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarModal from "../../Components/CalendarModal/CalendarModal";
import ErrorModal from "../../Components/ErrorModal/ErrorModal";
import CalendarLegend from "../../Components/CalendarLegend/CalendarLegend";
import { motion } from "framer-motion";
import getWeeksInMonth from "date-fns/getWeeksInMonth";

export default function CalendarView({
  setTrips,
  setAnalytics,
  calendar,
  setCalendar,
  overview,
  setOverview,
  choices,
  setChoices,
  holidays,
  PTO,
  startDate,
  endDate,
  weekends,
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
  const [error, setError] = useState("");
  const holidayDates = holidays.map((holiday) => holiday.observed);

  function handleOptimize() {
    if (PTO <= 0) {
      setError("You have no PTO available, please change your selections.");
    } else if (
      choices.filter((choice) => choice.choice === "vacation").length > PTO
    ) {
      setError(
        "You have more vacation days selected than available PTO, please change your selections."
      );
      //Check start date and end date are no more than 3 years apart
    } else if (endDate.diff(startDate, "years") > 3) {
      setError(
        "Your start date and end date for your calendar are more than 3 years apart, please change your selections."
      );
    } else {
      HolidayAPI.getCalendar(
        weekends,
        PTO,
        holidayDates,
        choices,
        startDate,
        endDate
      ).then((data) => {
        setCalendar(data.calendar);
        setOverview(data.overview);
        setAnalytics(data.analytics);
        setTrips(data.trips);
      });
    }
  }

  let numWeeks = getWeeksInMonth(activeDate, { weekStartsOn: 1 });
  const containerMaxHeight = numWeeks * 90 + 20;
  return (
    <div className="CalendarContainer">
      <CalendarModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedDate={selectedDate}
        choices={choices}
        setChoices={setChoices}
      />
      <ErrorModal error={error} setError={setError} />
      <motion.div
        className="CalendarAnimation"
        animate={{ height: containerMaxHeight }}
        transition={{ type: "spring", bounce: 0.2, duration: 1 }}
      >
        <MonthCalendar
          calendar={calendar}
          choices={choices}
          setOpenModal={setOpenModal}
          setActiveDate={setActiveDate}
          holidays={holidays}
          startDate={startDate}
          endDate={endDate}
          weekends={weekends}
          setSelectedDate={setSelectedDate}
        ></MonthCalendar>
      </motion.div>

      {calendar.length > 0 && <CalendarLegend calendar={calendar} />}
      <Holidays activeDate={activeDate} holidays={holidays}></Holidays>
      <CalendarOverview overview={overview}></CalendarOverview>
      <Fab variant="extended" style={style} onClick={() => handleOptimize()}>
        <CalendarMonthIcon sx={{ mr: 1 }} />
        Optimize
      </Fab>
    </div>
  );
}
