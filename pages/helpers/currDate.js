export const currDate = () => {
  const currYear = new Date().getFullYear();
  // the month is zero based, but to get a max date we need to add zero for months that are single numbered, like Jan = 01 instead of 1, or Feb that should be 02 instead of just 2, and so on...
  const currMonth =
    new Date().getMonth() + 1 < 10
      ? `0${new Date().getMonth() + 1}`
      : new Date().getMonth() + 1;
  const currDayOfTheMonth = new Date().getDate();

  // making the string from year, month and day
  const maxBirthDate = `${currYear}-${currMonth}-${currDayOfTheMonth}`;

  return maxBirthDate;
};
