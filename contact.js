function buildContactTemplate(inFooter) {
  inFooter = inFooter || false;
  var template =
    `${inFooter ? "<h1>K.Z. Clinic</h1>" : ""}` +
    `
<h3>Contact Info</h3>
<ul>
  <li>
    <div>
      <img src="images_svg/location_on.svg" alt="location pin icon" />
      <h4>Address</h4>
    </div>
    <a href="#">Zahraa El Maadi, El Nada Tower, First Floor.</a>
  </li>
  <li>
    <div>
      <img src="images_svg/landline.svg" alt="landline icon" />
      <h4>Phone</h4>
    </div>
    <a href="#">0225165064</a>
  </li>
  <li>
    <div>
      <img src="images_svg/mobile.svg" alt="mobile icon" />
      <h4>Mobile</h4>
    </div>
    <a href="#">01021646574</a>
  </li>
  <li>
    <div>
      <img src="images_svg/email.svg" alt="email icon" />
      <h4>Email</h4>
    </div>
    <a href="#">info@kareemzaher.com</a>
  </li>
</ul>
`;

  return template;
}

const contactList = document.querySelector(".contact-list");

contactList.insertAdjacentHTML("afterbegin", buildContactTemplate());

console.log(contactList);

const footerContact = document.querySelector(".footer-contact");

footerContact.insertAdjacentHTML("beforeend", buildContactTemplate(true));
