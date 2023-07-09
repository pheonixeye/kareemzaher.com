const navPagesIds = [
  "#appointments-id",
  "#services-id",
  "#articles-id",
  "#reviews-id",
  "#erection-test-id",
];

const footerTemplate = `
<footer class="site-footer">
  <div class="footer-card">
    <div class="footer-contact"></div>
  </div>
  <div class="footer-card">
    <div class="footer-about">
      <h1>About</h1>
      <div class="doctor-img-holder">
        <img id="doctor-img" src="" alt="doctor image" />
      </div>
      <h2>Dr. Kareem Zaher</h2>
      <h3>Uro-Andrology Specialist Surgeon</h3>
      <h3>E.U.A Member</h3>
      <h3>M.O.I. Hospitals</h3>
    </div>
  </div>
  <div class="footer-card">
    <div class="footer-nav">
      <h1>Site Map</h1>
      <ul class="site-map-list"></ul>
    </div>
  </div>
  <div class="copyright">
    <p>Copyright - KareemZaher.com</p>
  </div>
</footer>`;

const navTemplate = `
<div class="floating-btn-div">
  <button class="lang-btn" type="button" onclick="window.scrollTo({ top: 0, behavior: 'smooth' });">&#9650;</button>
  <button class="lang-btn" type="button">EN</button>
</div>
<div id="overlay-nav" class="overlay-nav">
<button type="button" class="closebtn" onclick="closeNav()">X</button>
  <div class="overlay-content" id="overlay-content"></div>
</div>
<div class="nav-bar">
  <h1>K.Z. Clinic</h1>
  <nav class="desktop-nav">
    <ul id="desktop-nav"></ul>
  </nav>
  <div class="mobile-nav">
    <button class="mobile-nav-btn" onclick="openNav()">
      <span>&#9776;</span>
    </button>
  </div>
</div>
`;

const socialTemplate = `
<!-- <div> separator </div> -->
    <div class="separator">
      <div></div>
      <h4>Social</h4>
      <div></div>
    </div>
    <!-- <div> clinic FOLLOW-US </div> -->
    <div class="follow-us">
      <div class="glass-btn blue-btn">
        <img
          src="images_svg/facebook.svg"
          alt="facebook"
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
    pageBody.insertAdjacentHTML("afterbegin", navTemplate);
    pageBody.insertAdjacentHTML("beforeend", socialTemplate);
    pageBody.insertAdjacentHTML("beforeend", footerTemplate);
  }
}
