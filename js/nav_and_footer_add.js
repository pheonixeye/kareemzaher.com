import { url } from "./urls.js";

const navPagesIds = [
  "#appointments-id",
  "#services-id",
  "#articles-id",
  "#reviews-id",
  "#erection-test-id",
  "#thankyou-id",
];

const footerTemplate = /*html*/ `
<footer class="site-footer">
  <div class="footer-card">
    <div class="footer-contact"></div>
  </div>
  <div class="footer-card">
    <div class="footer-about">
      <h1 lang-key="about">About</h1>
      <div class="doctor-img-holder">
        <img id="doctor-img" src="${url}/images_webp/doctor.webp" alt="doctor image" />
      </div>
      <h2 lang-key="docname">Dr. Kareem Zaher</h2>
      <h3 lang-key="doctitle">Uro-Andrology Specialist Surgeon</h3>
      <h3 lang-key="t4">E.U.A Member</h3>
    </div>
  </div>
  <div class="footer-card">
    <div class="footer-nav">
      <h1 lang-key="site-map">Site Map</h1>
      <ul class="site-map-list"></ul>
    </div>
  </div>
  <div class="copyright">
    <p lang-key="copyright">Copyright - KareemZaher.com</p>
  </div>
</footer>`;

const navTemplate = /*html*/ `
<div class="floating-btn-div">
  <button class="lang-btn" type="button" onclick="window.open('https://wa.me/+201021646574','_blank')">
  <img
  src="${url}/images_svg/wa.svg"
  alt="whatsapp icon"
  width="30"
  height="25"
/></button>
  <button class="lang-btn" type="button" onclick="window.scrollTo({ top: 0, behavior: 'smooth' });">&#9650;</button>
  <button id="lang-btn" class="lang-btn" type="button">ar</button>
</div>
<div id="overlay-nav" class="overlay-nav">
<button type="button" class="closebtn" onclick="closeNav()">X</button>
  <div class="overlay-content" id="overlay-content"></div>
</div>
<div class="nav-bar">
  <h1 lang-key="logo">K.Z. Clinic</h1>
  <nav class="desktop-nav">
    <ul id="desktop-nav"></ul>
  </nav>
  <div class="mobile-nav">
    <button class="mobile-nav-btn" >
      <span>&#9776;</span>
    </button>
  </div>
</div>
`;

function buildNavTemplate(pageId) {
  const inAppointments = pageId === navPagesIds[0];
  const alertTemplate = /*html*/ `
  <div id="alert-overlay">
    <div id="alert-template" class="slit-in-vertical">
      <div id="alert-head"> 
        ERROR !!! 
      </div>
      <div id="alert-body"> 
        ERROR-MESSAGE !!!
      </div>
      <div id="alert-action">
        <button id="alert-action-btn" lang-key="confirm">OK</button>
      </div>
    </div>
  </div>
  `;

  return inAppointments ? alertTemplate + navTemplate : navTemplate;
}

const socialTemplate = /*html*/ `
<!-- <div> separator </div> -->
    <div class="separator">
      <div></div>
      <h4 lang-key="social">Social</h4>
      <div></div>
    </div>
    <!-- <div> clinic FOLLOW-US </div> -->
    <div class="follow-us">
      <div class="glass-btn blue-btn">
        <img
          src="${url}/images_svg/facebook.svg"
          alt="facebook"
          style="width: 5.5em"
        />
      </div>
      <div class="glass-btn amber-btn">
        <img
          src="${url}/images_svg/playstore.svg"
          alt="erection-test-app"
          style="width: 5.5em"
        />
      </div>
    </div>
    <!-- <div> separator </div> -->
    <div class="separator">
      <div></div>
    </div>
`;

for (let index = 0; index < navPagesIds.length; index++) {
  const pageBody = document.querySelector(`${navPagesIds[index]}`);
  if (pageBody != undefined) {
    pageBody.insertAdjacentHTML(
      "afterbegin",
      buildNavTemplate(navPagesIds[index])
    );
    pageBody.insertAdjacentHTML("beforeend", socialTemplate);
    pageBody.insertAdjacentHTML("beforeend", footerTemplate);
  }
}

const facebookButton = document.querySelector(".glass-btn.blue-btn");
const playstoreButton = document.querySelector(".glass-btn.amber-btn");
facebookButton.addEventListener("click", (e) => {
  window.open("https://www.facebook.com/kzuroclinic", "_blank");
});
playstoreButton.addEventListener("click", (e) => {
  window.open(
    `https://play.google.com/store/apps/details?id=com.kareemzaher.iief15&hl=${window.localStorage.getItem("lang")}`,
    "_blank"
  );
});
