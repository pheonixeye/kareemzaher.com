const navPagesIds = [
  "#appointment-id",
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
<div class="overlay-nav">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">X</a>
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

for (let index = 0; index < navPagesIds.length; index++) {
  const pageBody = document.querySelector(`${navPagesIds[index]}`);
  if (pageBody != undefined) {
    pageBody.insertAdjacentHTML("afterbegin", navTemplate);
    pageBody.insertAdjacentHTML("beforeend", footerTemplate);
  }
}
