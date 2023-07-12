// import doctorInfo from "../js/fetch_doctor_data.js";
import navData from "./navigation_data.js";

// const imgData = doctorInfo["avatar"];
// const imgPrefix = "data:image/png;base64,";
// let image = new Image();
// image.src = imgPrefix + imgData;

// const imageHolder = document.querySelector("#doctor-img");
// imageHolder.src = image.src;

// insert items in bottom footer nav

function buildFooterNavTemplate(navData) {
  const Template = `
    <li>
      <div>
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

/* <img src="images_svg/site_map.svg" alt="site map icon" /> */
