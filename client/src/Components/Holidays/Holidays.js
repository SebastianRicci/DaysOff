import "./Holidays.css";
import HolidayCard from "../HolidayCard/HolidayCard";
export default function Holidays() {
  return (
    <div className="HolidaysContainer">
      <h3>Upcoming holidays (3)</h3>
      <HolidayCard />
    </div>
  );
}
