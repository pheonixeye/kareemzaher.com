console.log("js side connected...");

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
    slider.setAttribute("src", `images_jpg/${i}.jpg`);
    slider.setAttribute("alt", `slider image no ${i}`);
  }, randomInterval);
}
slideImages();

//insert list of days function
const days = ["Saturday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const colors = ["red", "green", "blue", "orange", "purple"];

function buildHourItem(index) {
  return `<li>
  <div class="hours-container">
    <div class="circle-shape" style="background-color: #0070cd">
      <img src="images_svg/calender.svg" alt="calender icon" />
    </div>
    <h3>${days[index]}</h3>
    <h5>6:00 P.M. - 10:00 P.M.</h5>
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

const socialButton = document.querySelector(".glass-btn.blue-btn");
socialButton.addEventListener("click", (e) => {
  window.open("https://www.facebook.com/kzuroclinic", "_blank");
});
