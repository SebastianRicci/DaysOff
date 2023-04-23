import "./MonthCalendar.css";
import Calendar from "react-calendar";
export default function MonthCalendar({ startDate, endDate, weekends }) {
  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      // Get the day of the week (0-6) for the current tile
      const dayOfWeek = date.getDay();
      // Check if it's a weekend day
      if (weekends.includes(dayOfWeek.toString())) {
        return "react-calendar__tile-ChosenWeekend";
      }
    }
  }
  return (
    <Calendar
      tileClassName={tileClassName}
      onClickDay={(value, event) => console.log(startDate._d.toDateString())}
      maxDate={new Date(endDate._d.toDateString())}
      minDate={new Date(startDate._d.toDateString())}
    ></Calendar>
  );
}
