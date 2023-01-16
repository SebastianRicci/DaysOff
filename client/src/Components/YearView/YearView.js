import Calendar from "react-calendar";
import moment from "moment";
import "./YearView.css";
export default function YearView({
  holidays,
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
            moment.utc(new Date(holiday)).format("YYYY-MM-DD") ==
            moment.utc(new Date(date)).format("YYYY-MM-DD")
        )
      ) {
        return "react-calendar__tile-Algorithm";
      }
      if (
        holidayDates.find(
          (holiday) =>
            moment.utc(new Date(holiday)).format("YYYY-MM-DD") ==
            moment.utc(new Date(date)).format("YYYY-MM-DD")
        )
      ) {
        return "react-calendar__tile-Holiday";
      }
      if (
        weekendAlgorithmDates.find(
          (holiday) =>
            moment.utc(new Date(holiday)).format("YYYY-MM-DD") ==
            moment.utc(new Date(date)).format("YYYY-MM-DD")
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
      let holidayFind;
      if (
        (holidayFind = holidays.find(
          (holiday) =>
            moment.utc(new Date(holiday.date)).format("MM DD YYYY") ==
            moment.utc(new Date(date)).format("MM DD YYYY")
        ))
      ) {
        return holidayFind.name;
      }
    }
  }
  return (
    <>
      <div className="yearContainer">
        <Calendar
          tileClassName={tileClassName}
          tileContent={tileContent}
          activeStartDate={new Date(2022, 0, 1)}
          showNeighboringMonth={false}
          nextLabel={""}
          next2Label={""}
          prevLabel={""}
          prev2Label={""}
        ></Calendar>
        <Calendar
          tileClassName={tileClassName}
          tileContent={tileContent}
          activeStartDate={new Date(2022, 1, 1)}
          showNeighboringMonth={false}
          nextLabel={""}
          next2Label={""}
          prevLabel={""}
          prev2Label={""}
        ></Calendar>
        <Calendar
          tileClassName={tileClassName}
          tileContent={tileContent}
          activeStartDate={new Date(2022, 2, 1)}
          showNeighboringMonth={false}
          nextLabel={""}
          next2Label={""}
          prevLabel={""}
          prev2Label={""}
        ></Calendar>
        <Calendar
          tileClassName={tileClassName}
          tileContent={tileContent}
          activeStartDate={new Date(2022, 3, 1)}
          showNeighboringMonth={false}
          nextLabel={""}
          next2Label={""}
          prevLabel={""}
          prev2Label={""}
        ></Calendar>
        <Calendar
          tileClassName={tileClassName}
          tileContent={tileContent}
          activeStartDate={new Date(2022, 4, 1)}
          showNeighboringMonth={false}
          nextLabel={""}
          next2Label={""}
          prevLabel={""}
          prev2Label={""}
        ></Calendar>
        <Calendar
          tileClassName={tileClassName}
          tileContent={tileContent}
          activeStartDate={new Date(2022, 5, 1)}
          showNeighboringMonth={false}
          nextLabel={""}
          next2Label={""}
          prevLabel={""}
          prev2Label={""}
        ></Calendar>
        <Calendar
          tileClassName={tileClassName}
          tileContent={tileContent}
          activeStartDate={new Date(2022, 6, 1)}
          showNeighboringMonth={false}
          nextLabel={""}
          next2Label={""}
          prevLabel={""}
          prev2Label={""}
        ></Calendar>
        <Calendar
          tileClassName={tileClassName}
          tileContent={tileContent}
          activeStartDate={new Date(2022, 7, 1)}
          showNeighboringMonth={false}
          nextLabel={""}
          next2Label={""}
          prevLabel={""}
          prev2Label={""}
        ></Calendar>
        <Calendar
          tileClassName={tileClassName}
          tileContent={tileContent}
          activeStartDate={new Date(2022, 8, 1)}
          showNeighboringMonth={false}
          nextLabel={""}
          next2Label={""}
          prevLabel={""}
          prev2Label={""}
        ></Calendar>
        <Calendar
          tileClassName={tileClassName}
          tileContent={tileContent}
          activeStartDate={new Date(2022, 9, 1)}
          showNeighboringMonth={false}
          nextLabel={""}
          next2Label={""}
          prevLabel={""}
          prev2Label={""}
        ></Calendar>
        <Calendar
          tileClassName={tileClassName}
          tileContent={tileContent}
          activeStartDate={new Date(2022, 10, 1)}
          showNeighboringMonth={false}
          nextLabel={""}
          next2Label={""}
          prevLabel={""}
          prev2Label={""}
        ></Calendar>
        <Calendar
          tileClassName={tileClassName}
          tileContent={tileContent}
          activeStartDate={new Date(2022, 11, 1)}
          showNeighboringMonth={false}
          nextLabel={""}
          next2Label={""}
          prevLabel={""}
          prev2Label={""}
        ></Calendar>
      </div>
    </>
  );
}
