import { Bar } from "react-chartjs-2";
import { useState } from "react";
import YearSelector from "../YearSelector/YearSelector";
import "./StackedBarChart.css";

export default function StackedBarChart({ result }) {
  const [selectedYear, setSelectedYear] = useState(Object.keys(result)[0]);
  const years = Object.keys(result);
  const workingDays = Object.values(result[selectedYear]).map(
    (month) => month.workingDays
  );
  const weekends = Object.values(result[selectedYear]).map(
    (month) => month.weekends
  );
  const holidays = Object.values(result[selectedYear]).map(
    (month) => month.holidays
  );
  const pickedDays = Object.values(result[selectedYear]).map(
    (month) => month.pickedDays
  );

  const data = {
    labels: Object.keys(result[selectedYear]),
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
        text: `DaysOff ${selectedYear} Breakdown`,
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
    <>
      <YearSelector
        selectedYear={selectedYear}
        years={years}
        setSelectedYear={setSelectedYear}
      />
      <div className="BarChart">
        <Bar data={data} options={options} />
      </div>
    </>
  );
}
