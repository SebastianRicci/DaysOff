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
    mandatoryDates,
    desiredDates,
    defaultDates
  ) {
    try {
      const calendar = await fetch(
        `${this.url}calendar/${weekends}/${leaves}/${holidayDates.join(
          ","
        )}/${mandatoryDates.join(",")}/${desiredDates.join(
          ","
        )}/${defaultDates.join(",")}`
      );
      const calendarArray = await calendar.json();
      return calendarArray;
    } catch (err) {
      console.warn("Error in getCalendar: ", err);
    }
  },
};
