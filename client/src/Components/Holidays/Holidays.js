import "./Holidays.css";
import HolidayCard from "../HolidayCard/HolidayCard";
export default function Holidays() {
  return (
    <div className="HolidaysContainer">
      <h3>Upcoming holidays (3)</h3>
      <HolidayCard holidayName="New Years" holidayDate="01/01/2023" />
      <HolidayCard holidayName="Christmas" holidayDate="24/12/2023" />
      <HolidayCard holidayName="Independence Day" holidayDate="01/01/2023" />
    </div>
  );
}
