import "./AnalyticsView.css";
import "chart.js/auto";
import StackedBarChart from "../../Components/StackedBarChart/StackedBarChart";
import OptimizationCard from "../../Components/OptimizationCard/OptimizationCard";
import EmptyState from "../../Components/EmptyState/EmptyState";

export default function AnalyticsView({ analytics }) {
  return (
    <>
      {Object.keys(analytics).length != 0 ? (
        <div className="AnalyticsContainer">
          <OptimizationCard
            pickedDays={analytics.totalPickedDays}
            vacationEarned={analytics.vacationEarned}
          />
          <StackedBarChart result={analytics.result} />
        </div>
      ) : (
        <EmptyState state={"Analytics"} />
      )}
    </>
  );
}
