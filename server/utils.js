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

    const desiredDates = choices
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
      //Set desired vacation dates to be true and their value equal to 1
      if (desiredDates.includes(calendar[i].date)) {
        calendar[i].vacation = true;
        calendar[i].value = 1;
        calendar[i].algo = 1;
      }

      //Set mandatory work dates to be true and their value equal to 1
      if (mandatoryDates.includes(calendar[i].date)) {
        calendar[i].mandatory = true;
      }

      //Override dates and set to default value
      if (defaultDates.includes(calendar[i].date)) {
        calendar[i].value = 0;
      }
    }
    return calendar;
  },

  pickedDays: function (calendar, vacationDays) {
    //Subtract desired vacation days from total pto available
    vacationDays -= calendar.filter((day) => day.vacation == true).length;

    //Handle case where vacationDays is larger than available days to pick from, thus returning a completely picked calendar.
    if (
      vacationDays >
      calendar.filter(
        (day) =>
          day.value == 0 &&
          day.algo == 0 &&
          day.holiday == false &&
          day.mandatory == false &&
          day.vacation == false
      ).length
    ) {
      for (let i = 0; i < calendar.length; i++) {
        if (
          calendar[i].value == 0 &&
          calendar[i].algo == 0 &&
          calendar[i].holiday == false &&
          calendar[i].mandatory == false &&
          calendar[i].vacation == false
        ) {
          calendar[i].value = 1;
          calendar[i].algo = 1;
        }
      }
      return calendar;
    }

    let bridge = 1;
    while (vacationDays > 0) {
      let streak = 0;
      for (let i = 0; i < calendar.length - 1; i++) {
        if (calendar[i].value == 0 && calendar[i].mandatory == false) {
          streak++;
          if (
            streak == bridge &&
            calendar[i + 1].value != 0 &&
            vacationDays > 0
          ) {
            for (let j = 0; j < bridge; j++) {
              if (vacationDays > 0 && calendar[i - j].mandatory == false) {
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

  // Function to find ranges of adjacent 1 elements with a length of 3 or more
  findRanges: function (calendar) {
    const ranges = [];
    let start = null;
    for (let i = 0; i < calendar.length; i++) {
      const currentValue = calendar[i].value;
      if (currentValue === 1) {
        if (start === null) {
          start = i;
        } else if (i === calendar.length - 1) {
          const end = i;
          if (end - start >= 2) {
            ranges.push({ start: start, end: end });
          }
        }
      } else {
        if (start !== null) {
          const end = i - 1;
          if (end - start >= 2) {
            ranges.push({ start, end });
          }
          start = null;
        }
      }
    }
    return ranges;
  },

  highlightWeekends: function (calendar) {
    // Call the findRanges function on the calendar array
    const ranges = this.findRanges(calendar);

    // Loop through each range and check holiday and algo properties
    ranges.forEach((range) => {
      for (let i = range.start; i <= range.end; i++) {
        const currentObj = calendar[i];
        if (currentObj.holiday === false && currentObj.algo === 0) {
          currentObj.algoWeekend = 1;
        }
      }
    });
    return calendar;
  },

  // Function to generate vacation period string for each range
  generateVacationPeriodString: function (calendar) {
    const ranges = this.findRanges(calendar);
    const vacationPeriodStrings = [];
    ranges.forEach((range, index) => {
      let pto = 0;
      let ptoDates = [];
      for (let i = range.start; i <= range.end; i++) {
        const currentObj = calendar[i];
        if (currentObj.algo === 1) {
          pto++;
          ptoDates.push(currentObj.date);
        }
      }
      const rangeLength = range.end - range.start + 1;
      if (pto === 0) {
        vacationPeriodStrings.push(
          `Vacation period ${
            index + 1
          }:\nEnjoy a long weekend of ${rangeLength} days without taking any days off (${moment(
            calendar[range.start].date
          ).format("dddd, MMMM Do YYYY")} to  ${moment(
            calendar[range.end].date
          ).format("dddd, MMMM Do YYYY")}).`
        );
      } else if (pto === 1) {
        vacationPeriodStrings.push(
          `Vacation period ${index + 1}:\nTake ${pto} day off (${ptoDates.map(
            (date) => {
              return moment(date).format("Do MMM");
            }
          )}) and enjoy a long weekend of ${rangeLength} days (${moment(
            calendar[range.start].date
          ).format("dddd, MMMM Do YYYY")} to  ${moment(
            calendar[range.end].date
          ).format("dddd, MMMM Do YYYY")}).`
        );
      } else {
        vacationPeriodStrings.push(
          `Vacation period ${index + 1}:\nTake ${pto} days off (${ptoDates.map(
            (date) => {
              return moment(date).format("Do MMM");
            }
          )}) and enjoy a vacation of ${rangeLength} days (${moment(
            calendar[range.start].date
          ).format("dddd, MMMM Do YYYY")} to  ${moment(
            calendar[range.end].date
          ).format("dddd, MMMM Do YYYY")}).`
        );
      }
    });
    return vacationPeriodStrings;
  },

  generateAnalytics: function (calendar) {
    let result = {};

    for (let i = 0; i < calendar.length; i++) {
      const date = moment(calendar[i].date);
      const year = date.format("YYYY");
      const month = date.format("MMMM");
      const isHoliday = calendar[i].holiday;
      const isWeekend = calendar[i].value == 1 && calendar[i].holiday == false;
      const isWorkingDay = calendar[i].value == 0;
      const isPickedDay = calendar[i].algo == 1;

      if (!result[year]) {
        result[year] = {};
      }

      if (!result[year][month]) {
        result[year][month] = {
          holidays: 0,
          workingDays: 0,
          weekends: 0,
          pickedDays: 0,
        };
      }

      if (isHoliday) {
        result[year][month].holidays++;
      } else if (isPickedDay) {
        result[year][month].pickedDays++;
      } else if (isWorkingDay) {
        result[year][month].workingDays++;
      } else if (isWeekend) {
        result[year][month].weekends++;
      }
    }

    const years = Object.keys(result);

    const yearMonths = years.reduce((acc, year) => {
      const months = Object.keys(result[year]);
      const yearMonths = months.map((month) => `${year} - ${month}`);
      return acc.concat(yearMonths);
    }, []);

    const pickedDays = yearMonths.map((yearMonth) => {
      const [year, month] = yearMonth.split(" - ");
      return result[year][month].pickedDays;
    });

    const totalPickedDays = pickedDays.reduce((acc, pickedDay) => {
      return acc + pickedDay;
    }, 0);

    const vacationEarned = this.findRanges(calendar).reduce((acc, range) => {
      return acc + range.end - range.start + 1;
    }, 0);

    return {
      result,
      vacationEarned,
      totalPickedDays,
    };
  },
};
