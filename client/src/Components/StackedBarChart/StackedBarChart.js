import { Bar } from "react-chartjs-2";
import "./StackedBarChart.css";

export default function StackedBarChart({
  holidays,
  workingDays,
  pickedDays,
  weekends,
  startDate,
}) {
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
        data: workingDays,
      },
      {
        label: "Weekends",
        backgroundColor: "rgba(54, 162, 235, 1)",
        data: weekends,
      },
      {
        label: "Holidays",
        backgroundColor: "rgba(255, 206, 86, 1)",
        data: holidays,
      },
      {
        label: "PTO",
        backgroundColor: "rgba(75, 192, 192, 1)",
        data: pickedDays,
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
        display: false,
        ticks: {
          beginAtZero: true,
        },
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Number of Days",
        },
      },
    },
    maintainAspectRatio: false,
    height: "100%",
  };
  return (
    <div className="BarChart">
      <Bar data={data} options={options} />
    </div>
  );
}
