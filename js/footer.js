import doctorInfo from "../js/fetch_doctor_data.js";

const imgData = doctorInfo["avatar"];
const imgPrefix = "data:image/png;base64,";
let image = new Image();
image.src = imgPrefix + imgData;

const imageHolder = document.querySelector("#doctor-img");
imageHolder.src = image.src;

// insert items in bottom footer nav
const navData = [
  {
    text: "Home",
    link: "../index.html",
  },
  {
    text: "Appointments",
    link: "../pages/appointments.html",
  },
  {
    text: "Services",
    link: "../pages/services.html",
  },
  {
    text: "Articles",
    link: "../pages/articles.html",
  },
  {
    text: "Ratings",
    link: "../pages/ratings.html",
  },
  {
    text: "Erection-Test",
    link: "../erection_test.html",
  },
];
function buildFooterNavTemplate(navData) {
  let Template = `
    <li>
      <div>
        <img src="../images_svg/site_map.svg" alt="site map icon" />
        <a href="${navData.link}">${navData.text}</a>
      </div>
    </li>`;
  return Template;
}

const footerNavList = document.querySelector(".site-map-list");

for (let index = 0; index < navData.length; index++) {
  footerNavList.insertAdjacentHTML(
    "beforeend",
    buildFooterNavTemplate(navData[index])
  );
}
