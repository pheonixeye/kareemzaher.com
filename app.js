//insert list of days function
const daysData = [
  { en: "Saturday",  ar: "السبت"    },
  { en: "Tuesday",   ar: "الثلاثاء" },
  { en: "Wednesday", ar: "الاربعاء" },
  { en: "Thursday",  ar: "الخميس"   },
];

function buildHourItem(day) {
  //TODO: CHANGE PER SCHEDULE UPDATE
  return /*html*/ `<li>
    <div class="hours-container">
      <div class="circle-shape" style="background-color: #0070cd">
        <img src="images_svg/calender.svg" alt="calender icon" />
      </div>
      <h3 lang-key="${day.en}">${day.ar}</h3>
      <h5>
        7:00 <span lang-key="pm">مساء</span> - 10:00
        <span lang-key="pm">مساء</span>
      </h5>
    </div>
  </li>`;
}

function completeListOfDays() {
  const daysList = document.querySelector("#clinic-hours-list");
  for (let index = 0; index < daysData.length; index++) {
    daysList.insertAdjacentHTML("beforeend", buildHourItem(daysData[index]));
  }
}
completeListOfDays();
