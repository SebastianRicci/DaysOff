import "./HolidayCard.css";

export default function HolidayCard({ holidayName, holidayDate }) {
  return (
    <div className="cardContainer">
      <h1 className="cardDate">{holidayDate.split("/")[0]}</h1>
      <div className="cardDescription">
        <div className="HolidayName">{holidayName}</div>
        <div className="HolidayDate">{holidayDate}</div>
      </div>
    </div>
  );
}
