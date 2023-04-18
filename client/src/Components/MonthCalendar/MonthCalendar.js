import "./MonthCalendar.css";
import Calendar from "react-calendar";
export default function MonthCalendar() {
  return (
    <Calendar
      onClickDay={(value, event) => console.log(value)}
      maxDate={new Date("12/31/2024")}
      minDate={new Date("01/01/2023")}
    ></Calendar>
  );
}
