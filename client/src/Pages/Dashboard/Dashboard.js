import React, { useState, useEffect } from "react";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./Dashboard.css";
import SideMenu from "../../Components/SideMenu/SideMenu";
import CalendarView from "../../Components/CalendarView/CalendarView";

export default function Dashboard({ holidays, vacationDays }) {
  const [action, setAction] = useState("Calendar");

  holidays = holidays.length
    ? holidays
    : JSON.parse(localStorage.getItem("holidays"));

  const availableLeaves = vacationDays
    ? vacationDays
    : JSON.parse(localStorage.getItem("vacationDays"));

  const holidayDates = holidays.length
    ? holidays.map((holiday) => holiday.date)
    : JSON.parse(localStorage.getItem("holidays")).map(
        (holiday) => holiday.date
      );

  const algorithmDates = Algorithm(setCalendarArray(), availableLeaves)
    .filter((day) => day.algo == 1)
    .map((day) => day.date);

  const weekendAlgorithmDates = checkWeekendsAlgorithm(
    Algorithm(setCalendarArray(), availableLeaves)
  )
    .filter((day) => day.algoWeekend == 1)
    .map((day) => day.date);

  function setCalendarArray() {
    //Set Initial array with dates and value as 0
    let startDate = new Date("01/01/2021");
    const endDate = new Date("12/31/2021");
    let calendar = [];
    while (startDate <= endDate) {
      calendar.push({
        date: moment(startDate).format("YYYY-MM-DD"),
        value: 0,
        algo: 0,
      });
      startDate = new Date(startDate.setDate(startDate.getDate() + 1));
    }
    //Set holidays to be true and their value equal to 1
    for (let i = 0; i < calendar.length; i++) {
      if (holidayDates.includes(calendar[i].date)) {
        calendar[i].holiday = true;
        calendar[i].value = 1;
      } else {
        calendar[i].holiday = false;
      }
      //Set Weekends values to 1
      if (
        new Date(calendar[i].date).getDay() == 0 ||
        new Date(calendar[i].date).getDay() == 6
      ) {
        calendar[i].value = 1;
      }
    }
    return calendar;
  }

  function Algorithm(calendar, vacationDays) {
    let bridge = 1;
    while (vacationDays > 0) {
      let streak = 0;
      for (let i = 0; i < calendar.length - 1; i++) {
        if (calendar[i].value == 0) {
          streak++;
          if (
            streak == bridge &&
            calendar[i + 1].value != 0 &&
            vacationDays > 0
          ) {
            for (let j = 0; j < bridge; j++) {
              if (vacationDays > 0) {
                calendar[i - j].value = 1;
                calendar[i - j].algo = 1;
                vacationDays--;
              }
            }
          }
        } else {
          streak = 0;
        }
      }
      bridge++;
    }
    return calendar;
  }

  function checkWeekendsAlgorithm(calendar) {
    for (let i = 1; i < calendar.length - 1; i++) {
      if (
        calendar[i].algo == 1 &&
        new Date(calendar[i + 1].date).getDay() == 6
      ) {
        calendar[i + 1].algoWeekend = 1;
        calendar[i + 2].algoWeekend = 1;
      } else if (
        calendar[i].algo == 1 &&
        new Date(calendar[i - 1].date).getDay() == 0
      ) {
        calendar[i - 1].algoWeekend = 1;
        calendar[i - 2].algoWeekend = 1;
      } else if (
        calendar[i].value == 1 &&
        new Date(calendar[i].date).getDay() == 5
      ) {
        calendar[i + 1].algoWeekend = 1;
        calendar[i + 2].algoWeekend = 1;
      } else if (
        calendar[i].value == 1 &&
        new Date(calendar[i].date).getDay() == 1
      ) {
        calendar[i - 1].algoWeekend = 1;
        calendar[i - 2].algoWeekend = 1;
      }
    }
    return calendar;
  }

  return (
    <main>
      <div className="dashboard">
        <SideMenu setAction={setAction} action={action}></SideMenu>
        {action == "Calendar" && (
          <CalendarView
            holidays={holidays}
            holidayDates={holidayDates}
            algorithmDates={algorithmDates}
            weekendAlgorithmDates={weekendAlgorithmDates}
          />
        )}
        {action == "Holidays" && <h1>Holidays</h1>}
        {action == "Analytics" && <h1>Analytics</h1>}
      </div>
    </main>
  );
}
