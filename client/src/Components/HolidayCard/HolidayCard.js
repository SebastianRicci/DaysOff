import "./HolidayCard.css";

export default function HolidayCard({ Name, Date }) {
  return (
    <div className="cardContainer">
      <h1 className="cardDate">23</h1>
      <div className="cardDescription">
        <div className="HolidayName">{Name}</div>
        <div className="HolidayDate">{Date} 25th</div>
      </div>
    </div>
  );
}
