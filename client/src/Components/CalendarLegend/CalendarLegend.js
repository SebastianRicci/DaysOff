import "./CalendarLegend.css";

export default function CalendarLegend({ calendar }) {
  return (
    <div className="LegendContainer">
      <div className="LegendItem">
        <div className="LegendColor" style={{ background: "#006bff" }}></div>
        <div className="LegendText">Picked Days</div>
      </div>

      <div className="LegendItem">
        <div className="LegendColor" style={{ background: "#0ae8f0" }}></div>
        <div className="LegendText">Holidays and Weekends</div>
      </div>
    </div>
  );
}
