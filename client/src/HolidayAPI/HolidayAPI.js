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

  getHolidays: async function (location) {
    try {
      const holidays = await fetch(`${this.url}holidays/${location}`);
      const holidaysArray = await holidays.json();
      return holidaysArray;
    } catch (err) {
      console.warn("Error in getHolidays: ", err);
    }
  },

  getPickedDays: async function (leaves, holidayDates) {
    try {
      const pickedDays = await fetch(
        `${this.url}pickedDays/${leaves}/${holidayDates.join(",")})}`
      );
      const pickedDaysArray = await pickedDays.json();
      return pickedDaysArray;
    } catch (err) {
      console.warn("Error in getPickedDays: ", err);
    }
  },

  getWeekends: async function (leaves, holidayDates) {
    try {
      const holidays = await fetch(
        `${this.url}weekends/${leaves}/${holidayDates.join(",")})}`
      );
      const holidaysArray = await holidays.json();
      return holidaysArray;
    } catch (err) {
      console.warn("Error in getHolidays: ", err);
    }
  },
};
