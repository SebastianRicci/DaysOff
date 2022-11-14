import "./MonthView.css";
import Calendar from "react-calendar";
import moment from "moment";

export default function MonthView({
  holidayDates,
  algorithmDates,
  weekendAlgorithmDates,
}) {
  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (
        algorithmDates.find(
          (holiday) =>
            moment(new Date(holiday)).format("YYYY-MM-DD") ==
            moment(new Date(date)).format("YYYY-MM-DD")
        )
      ) {
        return "react-calendar__tile-Algorithm";
      }
      if (
        holidayDates.find(
          (holiday) =>
            moment(new Date(holiday)).format("YYYY-MM-DD") ==
            moment(new Date(date)).format("YYYY-MM-DD")
        )
      ) {
        return "react-calendar__tile-Holiday";
      }
      if (
        weekendAlgorithmDates.find(
          (holiday) =>
            moment(new Date(holiday)).format("YYYY-MM-DD") ==
            moment(new Date(date)).format("YYYY-MM-DD")
        )
      ) {
        return "react-calendar__tile-AlgoWeekend";
      }
    }
  }

  function tileContent({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (
        holidayDates.find(
          (holiday) =>
            moment(new Date(holiday)).format("MM DD YYYY") ==
            moment(new Date(date)).format("MM DD YYYY")
        )
      ) {
        return "";
      }
    }
  }
  return (
    <Calendar
      tileClassName={tileClassName}
      tileContent={tileContent}
      defaultValue={new Date(2021, 0, 1)}
    ></Calendar>
  );
}
