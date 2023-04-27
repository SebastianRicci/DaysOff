import "./OptimizationCard.css";

export default function OptimizationCard({ pickedDays, vacationEarned }) {
  return (
    <div className="OptimizedVacations">
      <div className="OptimizedBody">
        <div className="OptimizedDaysContainer">
          <div className="OptimizedDays">
            <div className="OptimizedLabel">PTO spent</div>
            <div className="OptimizedValue">{pickedDays} days</div>
          </div>
          <div className="OptimizedDays">
            <div className="OptimizedLabel">Vacation earned</div>
            <div className="OptimizedValue">{vacationEarned} days</div>
          </div>
        </div>
        <div className="OptimizationFactor">
          <div className="OptimizedLabel">Optimization Factor</div>
          <div className="OptimizedValue">
            {Math.round((vacationEarned / pickedDays) * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}
