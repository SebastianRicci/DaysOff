import "./MonthCalendar.css";
import moment from "moment";
import Calendar from "react-calendar";
export default function MonthCalendar({
  calendar,
  choices,
  setOpenModal,
  setActiveDate,
  holidays,
  startDate,
  endDate,
  weekends,
  setSelectedDate,
}) {
  const handleDateChange = (date) => {
    setActiveDate(date.activeStartDate);
  };

  function tileClassName({ date, view }) {
    if (view === "month") {
      // Convert date to UTC format
      const utcDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );

      // Check if the date is a chosen weekend
      const dayOfWeek = utcDate.getUTCDay();
      const isWeekend = weekends.includes(dayOfWeek.toString());

      // Check if the date is a holiday
      const isHoliday = holidays.find(
        (holiday) =>
          moment.utc(new Date(holiday.observed)).format("YYYY-MM-DD") ===
            moment.utc(new Date(utcDate)).format("YYYY-MM-DD") ||
          choices.find(
            (choice) =>
              moment.utc(new Date(choice.date)).format("YYYY-MM-DD") ===
                moment.utc(new Date(utcDate)).format("YYYY-MM-DD") &&
              choice.choice === "publicHoliday"
          )
      );

      // Check if the date is a user choice
      const choice = choices.find(
        (choice) =>
          moment.utc(new Date(choice.date)).format("YYYY-MM-DD") ===
          moment.utc(new Date(utcDate)).format("YYYY-MM-DD")
      );

      //Check if the date is a picked algorithm date
      const isAlgorithm = calendar.find(
        (el) =>
          moment.utc(new Date(el.date)).format("YYYY-MM-DD") ===
            moment.utc(new Date(utcDate)).format("YYYY-MM-DD") && el.algo === 1
      );

      //Check if the date is a highlighted weekend picked by the algorithm
      const isAlgorithmWeekend = calendar.find(
        (el) =>
          moment.utc(new Date(el.date)).format("YYYY-MM-DD") ===
            moment.utc(new Date(utcDate)).format("YYYY-MM-DD") &&
          el.algoWeekend === 1
      );

      // Determine which class to apply
      // if (choice) {
      //   switch (choice.choice) {
      //     case "mandatory":
      //       return "react-calendar__tile-Mandatory";
      //     case "vacation":
      //       return "react-calendar__tile-Vacation";
      //     case "publicHoliday":
      //       return "react-calendar__tile-PublicHoliday";
      //     default:
      //       return "react-calendar__tile";
      //   }
      if (isHoliday) {
        return "react-calendar__tile-Holiday";
      } else if (isAlgorithmWeekend) {
        return "react-calendar__tile-AlgoWeekend";
      } else if (isWeekend) {
        return "react-calendar__tile-Weekend";
      } else if (isAlgorithm) {
        return "react-calendar__tile-Algorithm";
      } else {
        return "react-calendar__tile";
      }
    }
  }

  function tileContent({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      // Convert date to UTC format
      const utcDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );

      const choice = choices.find(
        (choice) =>
          moment.utc(new Date(choice.date)).format("YYYY-MM-DD") ===
          moment.utc(new Date(utcDate)).format("YYYY-MM-DD")
      );

      if (choice) {
        switch (choice.choice) {
          case "mandatory":
            return (
              <span role="img" aria-label="mandatory">
                💼
              </span>
            );
          case "vacation":
            return (
              <span role="img" aria-label="vacation">
                🌴
              </span>
            );
          case "publicHoliday":
            return (
              <span role="img" aria-label="public holiday">
                🎉
              </span>
            );
        }
      } else if (
        holidays.find(
          (holiday) =>
            moment.utc(new Date(holiday.observed)).format("YYYY-MM-DD") ===
            moment.utc(new Date(utcDate)).format("YYYY-MM-DD")
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
      minDetail="year"
      onClickDay={(date) => setOpenModal(true)}
      onChange={(date) => setSelectedDate(date)}
      defaultValue={startDate._d}
      showNeighboringMonth={false}
      onActiveStartDateChange={handleDateChange}
      tileContent={tileContent}
      tileClassName={tileClassName}
      maxDate={new Date(endDate._d.toDateString())}
      minDate={new Date(startDate._d.toDateString())}
    ></Calendar>
  );
}
