import "./AnalyticsView.css";
import "chart.js/auto";
import StackedBarChart from "../../Components/StackedBarChart/StackedBarChart";
import OptimizationCard from "../../Components/OptimizationCard/OptimizationCard";

export default function AnalyticsView({ analytics }) {
  return (
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
  );
}
