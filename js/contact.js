const clinicLocation =
  "https://www.google.com/maps/place/%D8%AF+%2F+%D9%83%D8%B1%D9%8A%D9%85+%D8%B2%D8%A7%D9%87%D8%B1+-+%D8%A7%D8%AE%D8%B5%D8%A7%D8%A6%D9%8A+%D8%AC%D8%B1%D8%A7%D8%AD%D8%A9+%D8%A7%D9%84%D9%85%D8%B3%D8%A7%D9%84%D9%83+%D8%A7%D9%84%D8%A8%D9%88%D9%84%D9%8A%D8%A9+%D9%88+%D8%A7%D9%84%D8%B0%D9%83%D9%88%D8%B1%D8%A9+%D9%88+%D8%A7%D9%84%D8%B9%D9%82%D9%85%E2%80%AD/@29.969841,31.316117,17z/data=!4m6!3m5!1s0x145839cdf3fc8a2d:0x7f601d548cf1ffd4!8m2!3d29.9698406!4d31.3161166!16s%2Fg%2F11jk_pgwdh?hl=en&entry=ttu";
const phone = "0225165064";
const mobile = "01021646574";
const email = "info@kareemzaher.com";

function blackStyleString(inFooter) {
  return inFooter ? "" : "contact-data-color-black";
}

function buildContactTemplate(inFooter) {
  inFooter = inFooter || false;
  const template =
    `${inFooter ? '<h1 lang-key="logo">K.Z. Clinic</h1>' : ""}` +
    /*html*/ `
    <ul>
    <h3 lang-key="contact-info">Contact Info</h3>
  <li>
    <div>
      <img src="images_svg/location_on.svg" alt="location pin icon" />
      <h4 class="contact-link-title" lang-key="address">Address</h4>
    </div>
    <a href="${clinicLocation}" target="_blank" class="contact-link-data ${blackStyleString(
      inFooter
    )}" lang-key="address-data">Zahraa El Maadi, El Nada Tower, First Floor.</a>
  </li>
  <li>
    <div>
      <img src="images_svg/landline.svg" alt="landline icon" />
      <h4 class="contact-link-title" lang-key="phone">Phone</h4>
    </div>
    <a href="tel:${phone}" class="contact-link-data ${blackStyleString(
      inFooter
    )}">0225165064</a>
  </li>
  <li>
    <div>
      <img src="images_svg/mobile.svg" alt="mobile icon" />
      <h4 class="contact-link-title" lang-key="mobile">Mobile</h4>
    </div>
    <a href="tel:${mobile}" class="contact-link-data ${blackStyleString(
      inFooter
    )}">01021646574</a>
  </li>
  <li>
    <div>
      <img src="images_svg/email.svg" alt="email icon" />
      <h4 class="contact-link-title" lang-key="email">Email</h4>
    </div>
    <a href="mailto:${email}" class="contact-link-data ${blackStyleString(
      inFooter
    )}">info@kareemzaher.com</a>
  </li>
</ul>
`;

  return template;
}

const contactList = document.querySelector(".contact-list");

if (contactList != undefined) {
  contactList.insertAdjacentHTML("afterbegin", buildContactTemplate(false));
}

// console.log(contactList);

const footerContact = document.querySelector(".footer-contact");

if (footerContact != undefined) {
  footerContact.insertAdjacentHTML("beforeend", buildContactTemplate(true));
}
