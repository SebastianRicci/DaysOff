export const HolidayAPI = {
  url: process.env.REACT_APP_BASE_URL,

  getCountries: async function () {
    try {
      const countries = await fetch(`${this.url}countries`);
      const countriesArray = await countries.json();
      return countriesArray;
    } catch (err) {
      console.warn("Error in getCountries: ", err);
    }
  },

  getHolidays: async function (location, language) {
    try {
      const holidays = await fetch(
        `${this.url}holidays/${location}&${language}`
      );
      const holidaysArray = await holidays.json();
      return holidaysArray;
    } catch (err) {
      console.warn("Error in getHolidays: ", err);
    }
  },

  getCalendar: async function (
    weekends,
    leaves,
    holidayDates,
    choices,
    startDate,
    endDate
  ) {
    try {
      const requestBody = {
        weekends: weekends,
        leaves: leaves,
        holidayDates: holidayDates,
        choices: choices,
        startDate: startDate,
        endDate: endDate,
      };

      const result = await fetch(`${this.url}calendar`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const calendarObject = await result.json();
      return calendarObject;
    } catch (err) {
      console.warn("Error in getCalendar: ", err);
    }
  },
};
