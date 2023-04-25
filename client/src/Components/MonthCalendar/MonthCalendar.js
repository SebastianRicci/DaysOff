import "./MonthCalendar.css";
import moment from "moment";
import Calendar from "react-calendar";
export default function MonthCalendar({
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

  function tileClassName({ date }) {
    // Check if the date is a chosen weekend
    const dayOfWeek = date.getDay();
    const isWeekend = weekends.includes(dayOfWeek.toString());

    // Check if the date is a chosen holiday
    const isHoliday = holidays.find(
      (holiday) =>
        moment.utc(new Date(holiday.observed)).format("YYYY-MM-DD") ===
        moment.utc(new Date(date)).format("YYYY-MM-DD")
    );

    // Check if the date is a chosen choice
    const choice = choices.find(
      (choice) =>
        moment.utc(new Date(choice.date)).format("YYYY-MM-DD") ===
        moment.utc(new Date(date)).format("YYYY-MM-DD")
    );

    // Determine which class to apply
    if (choice) {
      switch (choice.choice) {
        case "mandatory":
          return "react-calendar__tile-Mandatory";
        case "vacation":
          return "react-calendar__tile-Vacation";
        case "public_holiday":
          return "react-calendar__tile-PublicHoliday";
        default:
          return "react-calendar__tile";
      }
    } else if (isHoliday) {
      return "react-calendar__tile-Holiday";
    } else if (isWeekend) {
      return "react-calendar__tile-Weekend";
    } else {
      return "react-calendar__tile";
    }
  }

  function tileContent({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to

      const choice = choices.find(
        (choice) =>
          moment.utc(new Date(choice.date)).format("YYYY-MM-DD") ===
          moment.utc(new Date(date)).format("YYYY-MM-DD")
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
          case "public_holiday":
            return (
              <span role="img" aria-label="public holiday">
                🎉
              </span>
            );
        }
      } else if (
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
