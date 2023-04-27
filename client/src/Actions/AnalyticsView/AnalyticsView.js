import "./AnalyticsView.css";
import "chart.js/auto";
import StackedBarChart from "../../Components/StackedBarChart/StackedBarChart";
import OptimizationCard from "../../Components/OptimizationCard/OptimizationCard";

export default function AnalyticsView({ analytics }) {
  return (
    <>
      {Object.keys(analytics).length != 0 ? (
        <div className="AnalyticsContainer">
          <OptimizationCard
            pickedDays={analytics.totalPickedDays}
            vacationEarned={analytics.vacationEarned}
          />
          <StackedBarChart
            holidays={analytics.holidays}
            workingDays={analytics.workingDays}
            pickedDays={analytics.pickedDays}
            weekends={analytics.weekends}
            startDate={analytics.startDate}
          />
        </div>
      ) : (
        <h1>No data</h1>
      )}
    </>
  );
}
