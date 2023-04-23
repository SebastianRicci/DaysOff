import "./MonthCalendar.css";
import Calendar from "react-calendar";
export default function MonthCalendar({ startDate, endDate, weekends }) {
  return (
    <Calendar
      onClickDay={(value, event) => console.log(startDate._d.toDateString())}
      maxDate={new Date(endDate._d.toDateString())}
      minDate={new Date(startDate._d.toDateString())}
    ></Calendar>
  );
}
