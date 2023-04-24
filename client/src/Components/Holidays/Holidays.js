import "./Holidays.css";
import HolidayCard from "../HolidayCard/HolidayCard";
import moment from "moment";
export default function Holidays({ holidays, activeDate }) {
  const monthHolidays = holidays.filter(
    (holiday) =>
      moment(holiday.observed).month() === moment(activeDate).month() &&
      moment(holiday.observed).year() === moment(activeDate).year()
  );

  return (
    <div className="HolidaysContainer">
      <h3>Upcoming holidays ({monthHolidays.length})</h3>
      {monthHolidays.map((holiday) => (
        <HolidayCard
          key={holiday.name}
          holidayName={holiday.name}
          holidayDate={moment(holiday.observed).format("DD/MM/YYYY")}
        />
      ))}
      {monthHolidays.length === 0 && (
        <div className="NoHolidays">No holidays this month</div>
      )}
    </div>
  );
}
