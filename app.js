// console.log("js side connected...");

//hero div image slider function
//TODO: MAKE BETTER TRANSITION
function slideImages() {
  const slider = document.querySelector("#slider-image");
  let i = 0;
  const randomInterval = Math.floor((Math.random() + 1) * 6000);

  setInterval(() => {
    i++;
    if (i == 13) {
      i = 0;
    }
    // console.log(slider);
    // console.log(randomInterval);
    slider.setAttribute("src", `images_webp/${i}.webp`);
    slider.setAttribute("alt", `slider image no ${i}`);
  }, randomInterval);
}
// slideImages();

//insert list of days function
const days = ["Saturday", "Tuesday", "Wednesday", "Thursday"];
const colors = ["red", "green", "blue", "orange", "purple"];

function buildHourItem(index) {
  return `<li>
  <div class="hours-container">
    <div class="circle-shape" style="background-color: #0070cd">
      <img src="images_svg/calender.svg" alt="calender icon" />
    </div>
    <h3 lang-key="${days[index]}">${days[index]}</h3>
    <h5>8:00 <span lang-key="pm">P.M.</span> - 10:00 <span lang-key="pm">P.M.</span></h5>
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
