import "./Holidays.css";
import HolidayCard from "../HolidayCard/HolidayCard";
import moment from "moment";
import { motion } from "framer-motion";
export default function Holidays({ holidays, activeDate }) {
  const monthHolidays = holidays.filter(
    (holiday) =>
      moment(holiday.observed).month() === moment(activeDate).month() &&
      moment(holiday.observed).year() === moment(activeDate).year()
  );

  let cardHeight = 120;
  let numHolidays = monthHolidays.length;
  if (numHolidays === 1) {
    cardHeight = 150;
  } else if (numHolidays === 0) {
    numHolidays = 1;
  }
  const containerMaxHeight = numHolidays * cardHeight;

  return (
    <motion.div
      className="HolidaysContainer"
      animate={{ height: containerMaxHeight }}
      transition={{ type: "spring", bounce: 0.2, duration: 1 }}
    >
      <div className="HolidaysContainer">
        <h3>Upcoming holidays ({monthHolidays.length})</h3>
        {monthHolidays.map((holiday, index) => (
          <motion.div
            transition={{ delay: 0.1 * index }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={holiday.name}
          >
            <HolidayCard
              key={holiday.name}
              holidayName={holiday.name}
              holidayDate={moment(holiday.observed).format("DD/MM/YYYY")}
            />
          </motion.div>
        ))}
        {monthHolidays.length === 0 && (
          <div className="NoHolidays">No holidays this month</div>
        )}
      </div>
    </motion.div>
  );
}
