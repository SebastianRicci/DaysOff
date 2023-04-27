import "./AnalyticsView.css";
import "chart.js/auto";
import StackedBarChart from "../../Components/StackedBarChart/StackedBarChart";

export default function AnalyticsView({ analytics }) {
  return (
    <div className="AnalyticsContainer">
      <div className="OptimizedVacations">
        <h1>Optimized Vacations</h1>
      </div>
      <StackedBarChart
        holidays={analytics.holidays}
        workingDays={analytics.workingDays}
        pickedDays={analytics.pickedDays}
        weekends={analytics.weekends}
        startDate={analytics.startDate}
      />
    </div>
  );
}
