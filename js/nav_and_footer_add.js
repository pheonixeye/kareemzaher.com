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
      <h2 lang-key="about">About</h2>
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
      <h2 lang-key="site-map">Site Map</h2>
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
<button type="button" id='close-nav-btn' class="closebtn">X</button>
  <div class="overlay-content" id="overlay-content"></div>
</div>
<div class="nav-bar">
  <div class="site-logo" lang-key="logo">K.Z. Clinic</div>
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
    <div class="section-title">
      <h2 lang-key="social">Social</h2>
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


const days = ["Saturday", "Tuesday", "Wednesday", "Thursday"];

function buildScheduleList() {
  let html = '';
  days.forEach(day => {
    html += `<li>
    <div class="hours-container">
      <div class="circle-shape" style="background-color: #0070cd">
        <img src="${url}/images_svg/calender.svg" alt="calender icon" />
      </div>
      <h3 lang-key="${day}">${day}</h3>
      <h5>
        7:00 <span lang-key="pm">P.M.</span> - 10:00
        <span lang-key="pm">P.M.</span>
      </h5>
    </div>
  </li>`;
  });
  return html;
}

const contactMapHoursTemplate = /*html*/ `
  <!-- Contact Section -->
  <div class="section-title">
    <h2 lang-key="contact">Contact</h2>
  </div>
  <div class="contact-map-hours">
    <div class="map-container">
      <iframe class="map-iframe" title="clinic-location-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.333464319708!2d31.313541674747775!3d29.969845222102883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145839cdf3fc8a2d%3A0x7f601d548cf1ffd4!2z2K8gLyDZg9ix2YrZhSDYstin2YfYsSAtINin2K7Ytdin2KbZiiDYrNix2KfYrdipINin2YTZhdiz2KfZhNmDINin2YTYqNmI2YTZitipINmIINin2YTYsNmD2YjYsdipINmIINin2YTYudmC2YU!5e0!3m2!1sen!2seg!4v1688337423723!5m2!1sen!2seg"
        style="border: 0" allowfullscreen="" target="_parent" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div class="contact-list">
      <!--! Content populated by contact.js !-->
    </div>
    <div class="clinic-hours">
      <ul id="clinic-hours-list">
        <h3 lang-key="clinic-hours">Clinic Hours</h3>
        ${buildScheduleList()}
      </ul>
    </div>
  </div>
`;

for (let index = 0; index < navPagesIds.length; index++) {
  const pageBody = document.querySelector(`${navPagesIds[index]}`);
  if (pageBody != undefined) {
    pageBody.insertAdjacentHTML(
      "afterbegin",
      buildNavTemplate(navPagesIds[index])
    );
    pageBody.insertAdjacentHTML("beforeend", contactMapHoursTemplate);
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
