//insert list of days function
const days = ["Saturday", "Tuesday", "Wednesday", "Thursday"];
const colors = ["red", "green", "blue", "orange", "purple"];

function buildHourItem(index) {
  //TODO: CHANGE PER SCHEDULE UPDATE
  return /*html*/ `<li>
    <div class="hours-container">
      <div class="circle-shape" style="background-color: #0070cd">
        <img src="images_svg/calender.svg" alt="calender icon" />
      </div>
      <h3 lang-key="${days[index]}">${days[index]}</h3>
      <h5>
        7:00 <span lang-key="pm">P.M.</span> - 10:00
        <span lang-key="pm">P.M.</span>
      </h5>
    </div>
  </li>`;
}

function completeListOfDays() {
  const daysList = document.querySelector("#clinic-hours-list");
  for (let index = 0; index < days.length; index++) {
    daysList.insertAdjacentHTML("beforeend", buildHourItem(index));
  }
}
completeListOfDays();
