import updateCalenderRealtime from "./calender_update_module.js";
import doctorInfo from "./fetch_doctor_data.js";
import Schedule from "./book_appointment.js";

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

const monthsToInt = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

function buildTH(number) {
  //todo:
  switch (number) {
    case "01":
      return "st";
    case "02":
      return "nd";
    case "03":
      return "rd";
    default:
      return "th";
  }
}

let dateToDay = {};

class DateItem {
  constructor(date, weekday, weekdayString, weekdayInitials, iDate) {
    this.date = date;
    this.weekday = weekday;
    this.weekdayString = weekdayString;
    this.weekdayInitials = weekdayInitials;
    this.iDate = iDate;
  }
}

const thisYear = date.getFullYear();

// const firstDayOfThisYear = new Date(thisYear, 0, 1);

for (let i = 0; i < Object.keys(months).length; i++) {
  dateToDay[i] = [];

  for (let j = 1; j < Object.values(months)[i].d + 1; j++) {
    const date_ = new Date(thisYear, i, j);
    const weekday = date_.getDay();
    const weekdayString = weekDays[weekday].a;
    const weekdayInitials = weekDays[weekday].b;

    dateToDay[i].push(
      new DateItem(j, weekday, weekdayString, weekdayInitials, date_)
    );
  }
}

const thisMonthListOfDays = dateToDay[date.getMonth()];
const nextMonthListOfDays =
  dateToDay[date.getMonth() + 1 === 12 ? 0 : date.getMonth() + 1];
const previousMonthDays =
  dateToDay[date.getMonth() - 1 === -1 ? 11 : date.getMonth() - 1];

// const firstDayofThisMonth = dateToDay[date.getMonth()][0];

const weekdayDay = document.getElementById("calender-header-weekday-day");
const monthYear = document.getElementById("calender-header-month-year");

//set day/date of calender header
weekdayDay.innerHTML = `${weekDays[date.getDay()].a} ${date.getDate()}${buildTH(
  date.getDate()
)}`;

//set month/year of calender header
monthYear.innerHTML = `${months[date.getMonth()].a} ${date.getFullYear()}`;

//set date of date display
const dateDisplay = document.querySelector(".info-date span");
dateDisplay.innerHTML = `${
  months[date.getMonth()].a
} ${date.getDate()}${buildTH(date.getDate())}, ${date.getFullYear()}`;

const currentMonth = document.querySelector("#current-month");

//set row of weekdays
for (let index = 0; index < Object.keys(weekDays).length; index++) {
  currentMonth.insertAdjacentHTML(
    "beforeend",
    `<span id="${weekDays[index].b}"` +
      " " +
      `class="weekday-list-item ${index}">` +
      " " +
      `${weekDays[index].b}</span>`
  );
}

//helper fns for integer view "adds zero to single digit integers"
function helperNormalizeNumbersView(number) {
  number = number.toString();
  if (number.length === 1) {
    return `0${number}`;
  } else {
    return number.toString();
  }
}

//grid item counter
let itemCounter = 0;

function buildPreviousMonthDays(pMonthDaysList, nMonthDaysList) {
  pMonthDaysList ??= previousMonthDays;
  nMonthDaysList ??= thisMonthListOfDays;

  const previousMonthDaysLength = pMonthDaysList.length;

  const skipCount = nMonthDaysList[0]["weekday"];

  // console.log(skipCount);

  const startingDayFromPreviousMonth = previousMonthDaysLength - skipCount;

  for (let index = 1; index <= skipCount; index++) {
    // const notAvailable =
    //   pMonthDaysList[pMonthDaysList.length - index].iDate < date;

    // console.log(notAvailable);
    currentMonth.insertAdjacentHTML(
      "beforeend",
      `<span id="${startingDayFromPreviousMonth + index}"` +
        " " +
        `data="${pMonthDaysList[index].iDate}"` +
        " " +
        `class="calender-day-item ` +
        " " +
        // `${notAvailable ? "not-available" : ""}` +
        "not-available" +
        " " +
        `m-prev">` +
        " " +
        `${startingDayFromPreviousMonth + index}</span>`
    );
    itemCounter++;
  }
}

buildPreviousMonthDays();

function buildCurrentMonthDays(monthDaysList) {
  monthDaysList ??= thisMonthListOfDays;

  for (let index = 0; index < monthDaysList.length; index++) {
    const notAvailable = monthDaysList[index].iDate <= date;

    const isToday =
      monthDaysList[index].iDate.getFullYear() === date.getFullYear() &&
      monthDaysList[index].iDate.getMonth() === date.getMonth() &&
      monthDaysList[index].iDate.getDate() === date.getDate();
    currentMonth.insertAdjacentHTML(
      "beforeend",
      `<span id="${monthDaysList[index].date}"` +
        " " +
        `data="${monthDaysList[index].iDate}" ` +
        " " +
        `class="calender-day-item wd-${monthDaysList[index].weekday} ` +
        " " +
        `${isToday ? "" : notAvailable ? "not-available" : ""}` +
        " " +
        `${isToday ? "is-today" : ""}">` +
        " " +
        `${helperNormalizeNumbersView(monthDaysList[index].date)}
         </span>`
    );
    itemCounter++;
  }
}

buildCurrentMonthDays();

function buildNextMonthDays(monthDaysList) {
  monthDaysList ??= nextMonthListOfDays;

  for (let index = 0; index < 42 - itemCounter; index++) {
    // const notAvailable = monthDaysList[index].iDate <= date;
    currentMonth.insertAdjacentHTML(
      "beforeend",
      `<span id="${monthDaysList[index].date}"` +
        " " +
        `data="${monthDaysList[index].iDate}"` +
        " " +
        `class="calender-day-item wd-${monthDaysList[index].weekday} m-next` +
        " " +
        // `${notAvailable ? "not-available" : ""}">` +
        `not-available">` +
        // " " +s
        `${helperNormalizeNumbersView(monthDaysList[index].date)}
      </span>`
    );
  }
}

buildNextMonthDays();

function activateCalenderItemListener() {
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

activateCalenderItemListener();

//data binding

//July 7th Thursday, 2023
function updateUIonClick(e) {
  e.addEventListener("click", (event) => {
    const data = e.attributes.getNamedItem("data").textContent;
    const itemDate = new Date(data);

    //update day & weekday

    weekdayDay.innerHTML = `${
      weekDays[itemDate.getDay()].a
    } ${itemDate.getDate()}${buildTH(itemDate.getDate())}`;

    //update month && year

    monthYear.innerHTML = `${
      months[itemDate.getMonth()].a
    } ${itemDate.getFullYear()}`;

    //update the date on the data entry page

    dateDisplay.innerHTML =
      `${months[itemDate.getMonth()].a}` +
      " " +
      `${itemDate.getDate()}` +
      `${buildTH(itemDate.getDay())}` +
      " " +
      `${weekDays[itemDate.getDay()].a}` +
      " " +
      `${itemDate.getFullYear()}`;

    //set data for request fomulation
    dateDisplay.setAttribute("reservation-date", `${itemDate.toISOString()}`);

    //set schedule for request formulation
    const scheduleList = doctorInfo["schedule"];
    let selectedSchedule;
    scheduleList.forEach((e) => {
      if (e["intday"] === itemDate.getDay()) {
        selectedSchedule = new Schedule(
          e["day"],
          e["intday"],
          e["start"],
          e["end"]
        ).toString();
      }
    });
    dateDisplay.setAttribute("schedule-day", `${selectedSchedule}`);
  });
}

// updateUIonClick();

function animateFrontToBack() {
  const calender = document.querySelector(".calender");
  const front = document.querySelector(".calender-front");
  const back = document.querySelector(".calender-back");
  const dismissBtn = document.querySelector(".dismiss");
  const items = document.querySelectorAll(".calender-day-item");
  items.forEach((e) => {
    if (
      e.classList.contains("not-available") ||
      e.classList.contains("m-prev") ||
      e.classList.contains("m-next")
    ) {
      return;
    } else {
      e.addEventListener("click", (event) => {
        calender.classList.add("flip");
        front.style.display = "none";
        back.classList.remove("flip");
        back.style.display = "";
      });
    }
    updateUIonClick(e);
  });
  dismissBtn.addEventListener("click", (event) => {
    //TODO: remove from back && customize events to form validate || cancel
    //TODO: add show success modal on confirm
    calender.classList.remove("flip");
    front.style.display = "";
    back.classList.add("flip");
    back.style.display = "none";
  });
}

animateFrontToBack();

//function to add or subtract months

const selectedMonthYearElement = document.querySelector(
  "#calender-header-month-year"
);

async function nextMonth() {
  //TODO:
  const dataArray = selectedMonthYearElement.innerHTML.split(" ");
  console.log("next: " + dataArray);

  const selectedMonth = monthsToInt[dataArray[0]];
  itemCounter = 0;
  let selectedYear = dataArray[1];
  let nextMonth;
  if (selectedMonth + 1 === 12) {
    dateToDay = {};
    nextMonth = 0;
    selectedYear++;

    for (let i = 0; i < Object.keys(months).length; i++) {
      dateToDay[i] = [];

      for (let j = 1; j < Object.values(months)[i].d + 1; j++) {
        const newdate = new Date(selectedYear, i, j);
        const weekday = newdate.getDay();
        const weekdayString = weekDays[weekday].a;
        const weekdayInitials = weekDays[weekday].b;

        dateToDay[i].push(
          new DateItem(j, weekday, weekdayString, weekdayInitials, newdate)
        );
      }
    }
  } else {
    nextMonth = selectedMonth + 1;
  }
  console.log(`nextMonth = ${nextMonth}`);

  selectedMonthYearElement.innerHTML = `${months[nextMonth].a} ${selectedYear}`;
  const selectedMonthDaysList = dateToDay[nextMonth];
  const previousMonthDaysList = dateToDay[nextMonth - 1];
  const nextMonthDaysList = dateToDay[nextMonth + 1];
  //remove items from the dom
  document.querySelectorAll(".calender-day-item").forEach((e) => {
    e.remove();
  });

  //rebuild items
  buildPreviousMonthDays(previousMonthDaysList, selectedMonthDaysList);
  buildCurrentMonthDays(selectedMonthDaysList);
  buildNextMonthDays(nextMonthDaysList);
  activateCalenderItemListener();
  animateFrontToBack();
  updateCalenderRealtime();
}

async function prevMonth() {
  const dataArray = selectedMonthYearElement.innerHTML.split(" ");
  console.log("prev: " + dataArray);
  const selectedMonth = monthsToInt[dataArray[0]];
  let selectedYear = dataArray[1];
  if (selectedMonth <= date.getMonth() && selectedYear <= date.getFullYear()) {
    return;
  }
  itemCounter = 0;
  let prevMonth;
  if (selectedMonth - 1 === -1) {
    dateToDay = {};
    prevMonth = 11;
    selectedYear--;

    for (let i = 0; i < Object.keys(months).length; i++) {
      dateToDay[i] = [];

      for (let j = 1; j < Object.values(months)[i].d + 1; j++) {
        const newdate = new Date(selectedYear, i, j);
        const weekday = newdate.getDay();
        const weekdayString = weekDays[weekday].a;
        const weekdayInitials = weekDays[weekday].b;

        dateToDay[i].push(
          new DateItem(j, weekday, weekdayString, weekdayInitials, newdate)
        );
      }
    }
  } else {
    prevMonth = selectedMonth - 1;
  }
  console.log(`prevMonth = ${prevMonth}`);
  selectedMonthYearElement.innerHTML = `${months[prevMonth].a} ${selectedYear}`;
  const selectedMonthDaysList = dateToDay[prevMonth];
  const previousMonthDaysList = dateToDay[prevMonth - 1];
  const nextMonthDaysList = dateToDay[prevMonth + 1];
  //remove items from the dom
  document.querySelectorAll(".calender-day-item").forEach((e) => {
    e.remove();
  });

  //rebuild items
  buildPreviousMonthDays(previousMonthDaysList, selectedMonthDaysList);
  buildCurrentMonthDays(selectedMonthDaysList);
  buildNextMonthDays(nextMonthDaysList);
  activateCalenderItemListener();
  animateFrontToBack();
  updateCalenderRealtime();
}

//bind nextMonth() / prevMonth() functions

function bindNextPrev() {
  document.querySelector("#next-month-btn").addEventListener("click", (e) => {
    nextMonth();
  });
  document.querySelector("#prev-month-btn").addEventListener("click", (e) => {
    prevMonth();
  });
}

bindNextPrev();
