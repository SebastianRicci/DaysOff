import "./AnalyticsView.css";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function AnalyticsView() {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Work days",
        backgroundColor: "rgba(255, 99, 132, 1)",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
      },
      {
        label: "Weekends",
        backgroundColor: "rgba(54, 162, 235, 1)",
        data: [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
      },
      {
        label: "Holidays",
        backgroundColor: "rgba(255, 206, 86, 1)",
        data: [30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "DaysOff Year Breakdown",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  return (
    <div className="AnalyticsContainer">
      <div className="BarChart">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
