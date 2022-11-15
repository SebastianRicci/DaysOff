import "./Legend.css";

export default function Legend() {
  return (
    <div className="legend">
      <div className="pickedLegend">
        <div className="pickedSquare"></div>
        <div className="legendTextContainer">
          <p className="legendText"> Picked Days </p>
        </div>
      </div>
      <div className="holidayLegend">
        <div className="holidaySquare"></div>
        <div className="legendTextContainer">
          <p className="legendText"> Holidays and Weekends </p>
        </div>
      </div>
    </div>
  );
}
