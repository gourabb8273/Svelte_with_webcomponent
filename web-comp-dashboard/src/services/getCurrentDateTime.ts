
/**
 * Return current date time & year in readable format (example: Dec 5, 2021)
 */
const monthInWords = [
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
];

function getCurrentDateTime() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const day = currentDate.getDate();
  const month = monthInWords[currentDate.getMonth()].slice(0, 3);
  const currentDateTime = month + " " + day + ", " + year;
  return currentDateTime;
}

export default getCurrentDateTime;