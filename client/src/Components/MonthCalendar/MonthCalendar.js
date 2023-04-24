import "./MonthCalendar.css";
import moment from "moment";
import Calendar from "react-calendar";
export default function MonthCalendar({
  setActiveDate,
  holidays,
  startDate,
  endDate,
  weekends,
}) {
  const handleDateChange = (date) => {
    setActiveDate(date.activeStartDate);
  };

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to

      // Get the day of the week (0-6) for the current tile date
      const dayOfWeek = date.getDay();
      // Check if the date is a chosen weekend
      if (weekends.includes(dayOfWeek.toString())) {
        // Check if the date is also a holiday
        const isHoliday = holidays.find(
          (holiday) =>
            moment.utc(new Date(holiday.observed)).format("YYYY-MM-DD") ===
            moment.utc(new Date(date)).format("YYYY-MM-DD")
        );

        if (isHoliday) {
          return "react-calendar__tile-ChosenWeekend react-calendar__tile-Holiday";
        }

        return "react-calendar__tile-ChosenWeekend";
      }

      if (
        holidays.find(
          (holiday) =>
            moment.utc(new Date(holiday.observed)).format("YYYY-MM-DD") ==
            moment.utc(new Date(date)).format("YYYY-MM-DD")
        )
      ) {
        return "react-calendar__tile-Holiday";
      }
    }
  }

  function tileContent({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (
        holidays.find(
          (holiday) =>
            moment.utc(new Date(holiday.observed)).format("YYYY-MM-DD") ==
            moment.utc(new Date(date)).format("YYYY-MM-DD")
        )
      ) {
        return (
          <span role="img" aria-label="holiday">
            🎉
          </span>
        );
      }
    }
  }
  return (
    <Calendar
      defaultValue={startDate._d}
      showNeighboringMonth={false}
      onActiveStartDateChange={handleDateChange}
      tileContent={tileContent}
      tileClassName={tileClassName}
      onClickDay={(value, event) =>
        console.log(moment.utc(new Date(value)).format("YYYY-MM-DD"))
      }
      maxDate={new Date(endDate._d.toDateString())}
      minDate={new Date(startDate._d.toDateString())}
    ></Calendar>
  );
}
