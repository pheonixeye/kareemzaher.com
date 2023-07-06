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

const initialToint = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
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
const nextMonthListOfDays =
  dateToDay[date.getMonth() + 1 === 12 ? 0 : date.getMonth() + 1];
const firstDayofThisMonth = dateToDay[date.getMonth()][0];

const weekdayDay = document.getElementById("calender-header-weekday-day");
const monthYear = document.getElementById("calender-header-month-year");

//set day/date of calender header
weekdayDay.innerHTML = `${weekDays[date.getDay()].a} ${date.getDate()}${buildTH(
  date.getDate()
)}`;

//set month/year of calender header
monthYear.innerHTML = `${months[date.getMonth()].a} ${date.getFullYear()}`;

//function to add or subtract months

function moveMonth() {
  //TODO:
}

const currentMonth = document.querySelector("#current-month");

//set row of weekdays
for (let index = 0; index < Object.keys(weekDays).length; index++) {
  currentMonth.insertAdjacentHTML(
    "beforeend",
    ` <span id="${weekDays[index].b}" class="weekday-list-item ${index}">
      ${weekDays[index].b}
      </span>
      `
  );
}

//grid item counter
var itemCounter = 0;

function buildPreviousMonthDays() {
  const previousMonthDays =
    dateToDay[date.getMonth() - 1 === -1 ? 11 : date.getMonth() - 1];

  const previousMonthDaysLength = previousMonthDays.length;

  const skipCount = initialToint[firstDayofThisMonth["weekdayInitials"]];

  const startingDayFromPreviousMonth = previousMonthDaysLength - skipCount;

  for (let index = 1; index <= skipCount; index++) {
    currentMonth.insertAdjacentHTML(
      "beforeend",
      ` <span id="${
        startingDayFromPreviousMonth + index
      }" class="calender-day-item not-available">
           ${startingDayFromPreviousMonth + index}
           </span>
           `
    );
    itemCounter++;
  }
}

function helperNormalizeNumbersView(number) {
  number = number.toString();
  if (number.length < 2) {
    return `0${number}`;
  } else {
    return number.toString();
  }
}

buildPreviousMonthDays();

function buildCurrentMonthDays() {
  for (let index = 0; index < thisMonthListOfDays.length; index++) {
    const notAvailable = thisMonthListOfDays[index].date < date.getDate();
    const isToday = thisMonthListOfDays[index].date === date.getDate();
    currentMonth.insertAdjacentHTML(
      "beforeend",
      ` <span id="${
        thisMonthListOfDays[index].date
      }" class="calender-day-item wd-${thisMonthListOfDays[index].weekday} ${
        notAvailable ? "not-available" : ""
      } ${isToday ? "is-today" : ""}">
         ${helperNormalizeNumbersView(thisMonthListOfDays[index].date)}
         </span>
         `
    );
    itemCounter++;
  }
}

buildCurrentMonthDays();

function buildNextMonthDays() {
  for (let index = 0; index < 42 - itemCounter; index++) {
    currentMonth.insertAdjacentHTML(
      "beforeend",
      ` <span id="${nextMonthListOfDays[index].date}"
       class="calender-day-item wd-${nextMonthListOfDays[index].weekday}">
      ${helperNormalizeNumbersView(nextMonthListOfDays[index].date)}
      </span>
               `
    );
  }
}

buildNextMonthDays();

function activateCalenderItem() {
  const items = document.querySelectorAll(".calender-day-item");
  items.forEach((e) => {
    if (!e.classList.contains("not-available")) {
      e.addEventListener("click", (event) => {
        items.forEach((e) => {
          e.classList.remove("is-active");
        });
        e.classList.toggle("is-active");
      });
    }
  });
}

activateCalenderItem();

function animateFrontToBack() {
  const calender = document.querySelector(".calender");
  const front = document.querySelector(".calender-front");
  const back = document.querySelector(".calender-back");
  const items = document.querySelectorAll(".calender-day-item");
  items.forEach((e) => {
    e.addEventListener("click", (event) => {
      calender.classList.add("flip");
      front.style.display = "none";
      back.classList.remove("flip");
      back.style.display = "";
    });
  });
  back.addEventListener("click", (event) => {
    calender.classList.remove("flip");
    front.style.display = "";
    back.classList.add("flip");
    back.style.display = "none";
  });
}

animateFrontToBack();
