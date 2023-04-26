const moment = require("moment");

module.exports = {
  setCalendarArray: function (
    weekends,
    holidayDates,
    choices,
    startDate,
    endDate
  ) {
    const mandatoryDates = choices
      .filter((choice) => choice.choice === "mandatory")
      .map((choice) => moment(choice.date).format("YYYY-MM-DD"));

    const vacationDates = choices
      .filter((choice) => choice.choice === "vacation")
      .map((choice) => moment(choice.date).format("YYYY-MM-DD"));

    const publicHolidayDates = choices
      .filter((choice) => choice.choice === "publicHoliday")
      .map((choice) => moment(choice.date).format("YYYY-MM-DD"));

    const defaultDates = choices
      .filter((choice) => choice.choice === "default")
      .map((choice) => moment(choice.date).format("YYYY-MM-DD"));

    //Set Initial array with dates and value as 0
    let start = new Date(startDate);
    const end = new Date(endDate);
    let calendar = [];
    while (start <= end) {
      calendar.push({
        date: moment(start).format("YYYY-MM-DD"),
        value: 0,
        algo: 0,
        holiday: false,
        mandatory: false,
        vacation: false,
      });
      start = new Date(start.setDate(start.getDate() + 1));
    }

    //Set holidays to be true and their value equal to 1
    for (let i = 0; i < calendar.length; i++) {
      if (
        holidayDates.includes(calendar[i].date) ||
        publicHolidayDates.includes(calendar[i].date)
      ) {
        calendar[i].holiday = true;
        calendar[i].value = 1;
      } else {
        calendar[i].holiday = false;
      }
      //Set Weekend values to 1
      if (weekends.includes(moment(calendar[i].date).day().toString())) {
        calendar[i].value = 1;
      }
      //Set mandatory work dates to be true and their value equal to 1
    }
    return calendar;
  },

  pickedDays: function (calendar, vacationDays) {
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
  },

  highlightWeekends: function (calendar, weekends) {
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
  },
};
