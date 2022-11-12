import Calendar from "react-calendar";
import SideMenu from "../../Components/SideMenu/SideMenu";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "../CalendarPage/CalendarPage.css";

export default function CalendarPage({ holidays }) {
  const holidayDates = holidays.map((holiday) => holiday.date);
  const algorithmDates = Algorithm(setCalendarArray(), 15);
  console.log(algorithmDates);

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
                console.log("Vacation: ", calendar[i - j].date);
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
    return calendar.filter((day) => day.algo == 1).map((day) => day.date);
  }

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (
        algorithmDates.find(
          (holiday) =>
            moment(new Date(holiday)).format("YYYY-MM-DD") ==
            moment(new Date(date)).format("YYYY-MM-DD")
        )
      ) {
        return "react-calendar__tile-Algorithm";
      }
    }
  }

  // function tileClassName({ date, view }) {
  //   // Add class to tiles in month view only
  //   if (view === "month") {
  //     // Check if a date React-Calendar wants to check is on the list of dates to add class to
  //     if (
  //       holidayDates.find(
  //         (holiday) =>
  //           moment(new Date(holiday)).format("YYYY-MM-DD") ==
  //           moment(new Date(date)).format("YYYY-MM-DD")
  //       )
  //     ) {
  //       return "react-calendar__tile-Holiday";
  //     }
  //   }
  // }

  function tileContent({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (
        holidayDates.find(
          (holiday) =>
            moment(new Date(holiday)).format("MM DD YYYY") ==
            moment(new Date(date)).format("MM DD YYYY")
        )
      ) {
        return "";
      }
    }
  }

  return (
    <>
      <div className="dashboard">
        <SideMenu></SideMenu>
        <div className="calendarContainer">
          <Calendar
            tileClassName={tileClassName}
            tileContent={tileContent}
            defaultValue={new Date(2021, 0, 1)}
          ></Calendar>
        </div>
      </div>
    </>
  );
}
