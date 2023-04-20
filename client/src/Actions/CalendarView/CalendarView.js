import "./CalendarView.css";

import Holidays from "../../Components/Holidays/Holidays";
import MonthCalendar from "../../Components/MonthCalendar/MonthCalendar";
import CalendarOverview from "../../Components/CalendarOverview/CalendarOverview";

export default function CalendarView() {
  return (
    <div className="CalendarContainer">
      <MonthCalendar></MonthCalendar>
      <Holidays></Holidays>
      <CalendarOverview></CalendarOverview>
    </div>
  );
}
