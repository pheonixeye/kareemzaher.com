const date = new Date();
const isLeapYear = date.getFullYear() % 4 === 0;
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const weekDays = {
  0: { a: "Sunday", b: "SUN" },
  1: { a: "Monday", b: "MON" },
  2: { a: "Tuesday", b: "TUE" },
  3: { a: "Wednesday", b: "WED" },
  4: { a: "Thursday", b: "THU" },
  5: { a: "Friday", b: "FRI" },
  6: { a: "Saturday", b: "SAT" },
};

const months = {
  0: { a: "January", b: "JAN", d: 31 },
  1: { a: "February", b: "FEB", d: isLeapYear ? 29 : 28 },
  2: { a: "March", b: "MAR", d: 31 },
  3: { a: "April", b: "APR", d: 30 },
  4: { a: "May", b: "MAY", d: 31 },
  5: { a: "June", b: "JUN", d: 30 },
  6: { a: "July", b: "JUL", d: 31 },
  7: { a: "August", b: "AUG", d: 31 },
  8: { a: "September", b: "SEP", d: 30 },
  9: { a: "October", b: "OCT", d: 31 },
  10: { a: "November", b: "NOV", d: 30 },
  11: { a: "December", b: "DEC", d: 31 },
};
function buildTH(number) {
  switch (number) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

var dateToDay = {};

class DateItem {
  constructor(date, weekday, weekdayString, weekdayInitials) {
    this.date = date;
    this.weekday = weekday;
    this.weekdayString = weekdayString;
    this.weekdayInitials = weekdayInitials;
  }
}

const thisYear = date.getFullYear();

const firstDayOfThisYear = new Date(thisYear, 0, 1);

for (let i = 0; i < Object.keys(months).length; i++) {
  dateToDay[i] = [];

  for (let j = 1; j < Object.values(months)[i].d + 1; j++) {
    const date = new Date(thisYear, i, j);
    const weekday = date.getDay();
    const weekdayString = weekDays[weekday].a;
    const weekdayInitials = weekDays[weekday].b;

    dateToDay[i].push(new DateItem(j, weekday, weekdayString, weekdayInitials));
  }
}

const thisMonthListOfDays = dateToDay[date.getMonth()];
const firstDayofThisMonth = dateToDay[date.getMonth()][0];

// console.log(dateToDay);
// console.log(thisMonthListOfDays);
console.log(firstDayofThisMonth);

const weekdayDay = document.getElementById("calender-header-weekday-day");
const monthYear = document.getElementById("calender-header-month-year");

//set date of calender header
weekdayDay.innerHTML = `${weekDays[date.getDay()].a} ${date.getDate()}${buildTH(
  date.getDate()
)}`;

monthYear.innerHTML = `${months[date.getMonth()].a} ${date.getFullYear()}`;

let currentMonth = document.querySelector("#current-month");

for (let index = 0; index < Object.keys(weekDays).length; index++) {
  currentMonth.insertAdjacentHTML(
    "beforeend",
    ` <span id="${weekDays[index].b}" class="weekday-list-item ${index}">
      ${weekDays[index].b}
      </span>
      `
  );
}

for (let index = 0; index < thisMonthListOfDays.length; index++) {
  const firstWeekdayItem = document.querySelector(
    `#${firstDayofThisMonth["weekdayInitials"]}`
  );
  //   console.log(thisMonthListOfDays[index]);
  //   console.log(firstWeekdayItem);
  if (firstWeekdayItem.id === thisMonthListOfDays[index]["weekdayInitials"]) {
    const weekdayInt = index + 1;
    console.log(weekdayInt);
  } else {
    currentMonth.insertAdjacentHTML(
      "beforeend",
      ` <span id="${thisMonthListOfDays[index].date}" class="calender-day-item wd-${thisMonthListOfDays[index].weekday}">
              ${thisMonthListOfDays[index].date}
              </span>
              `
    );
  }
}
