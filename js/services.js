/* eslint-disable no-unused-expressions */
import { services } from "./services_data.js";
import { url } from "./urls.js";
// console.log("services connected");

const servicesPageContent = document.querySelector(
  "#services-id .page-content"
);

const html = document.querySelector("html");

servicesPageContent.style.backgroundColor = "#f6f6f6";

// const services = data;

function buildServiceItemTemplate(dataItem, isEnglish) {
  const serviceItemTemplate = /*html*/ `
<div class="service-item" id="service-item-no-${dataItem.id}">
 <div class="service-item-pattern-div">
   <img src="${url}/images_webp/pattern.webp" alt="pattern opacity img" />
 </div>
 <div class="service-item-img-div">
   <h3>${isEnglish ? dataItem.entitle : dataItem.artitle}</h3>
   <img
     id="service-img-svg"
     src="${dataItem.svg}"
     alt="service no 0 svg"
   />
   <img
     id="service-img-gif"
     src="${dataItem.img}"
     alt="service img"
   />
   <h4 class="img-header-h4">${isEnglish ? dataItem.entitle : dataItem.artitle
    }</h4>
   <button class="img-header-btn"
   type="button">
     <img
       class="youtube-btn-svg-img"
       src="${url}/images_svg/youtube.svg"
       alt="youtube video link"
     />
   </button>
   <div class="img-paragraph-div">
     <p>
      ${isEnglish ? dataItem.enparagraph : dataItem.arparagraph}
     </p>
   </div>
 </div>
 <div class="service-item-info-div">
   <ul>
     <li>
       <div class="info-item-header-div">
         <div class="info-item-img-container">
           <img src="${url}/images_svg/bullet.svg" alt=" bullet svg" />
         </div>
         <h4>${isEnglish ? dataItem.info[0].entitle : dataItem.info[0].artitle
    }</h4>
       </div>
       <p>${isEnglish ? dataItem.info[0].entext : dataItem.info[0].artext}</p>
     </li>
     <li>
       <div class="info-item-header-div">
         <div class="info-item-img-container">
           <img src="${url}/images_svg/bullet.svg" alt=" bullet svg" />
         </div>
         <h4>${isEnglish ? dataItem.info[1].entitle : dataItem.info[1].artitle
    }</h4>
       </div>
       <p>
       ${isEnglish ? dataItem.info[1].entext : dataItem.info[1].artext}
       </p>
     </li>
     <li>
       <div class="info-item-header-div">
         <div class="info-item-img-container">
           <img src="${url}/images_svg/bullet.svg" alt=" bullet svg" />
         </div>
         <h4>${isEnglish ? dataItem.info[2].entitle : dataItem.info[2].artitle
    }</h4>
       </div>
       <p>
       ${isEnglish ? dataItem.info[2].entext : dataItem.info[2].artext}
       </p>
     </li>
     ${dataItem.info[3] != undefined
      ? /*html*/ `<li>
             <div class="info-item-header-div">
               <div class="info-item-img-container">
                 <img src="${url}/images_svg/bullet.svg" alt=" bullet svg" />
               </div>
               <h4>
                 ${isEnglish
        ? dataItem.info[3].entitle
        : dataItem.info[3].artitle
      }
               </h4>
             </div>
             <p>
               ${isEnglish ? dataItem.info[3].entext : dataItem.info[3].artext}
             </p>
           </li>`
      : ""
    }
   </ul>
 </div>
</div>
<div class="services-separator"></div>
`;
  return serviceItemTemplate;
}

const pageTitle = document.querySelector(".services-main-title");

function rebuildServices() {
  const lang = html.getAttribute("lang");

  const servicesToBeRemoved = document.querySelectorAll(".service-item");
  const separatorsToBeRemoved = document.querySelectorAll(
    ".services-separator"
  );
  servicesToBeRemoved.forEach((s, index) => {
    s.remove();
    separatorsToBeRemoved[index].remove();
  });
  services.forEach((service) => {
    pageTitle.insertAdjacentHTML(
      "afterend",
      buildServiceItemTemplate(service, lang == "en")
    );
    if (service.id % 2 === 0) {
      const serviceItem = document.querySelector(
        `#service-item-no-${service.id}`
      );
      serviceItem.style.backgroundColor = "#23a4a0";
    }
  });
  const btns = document.querySelectorAll(".img-header-btn");
  btns.forEach((e, index) => {
    e.onclick = () => {
      `${window.open(services[index].ytlink, "_blank")}`;
    };
    // e.setAttribute("onclick", function () {
    //   window.open(services[index].ytlink, "_blank");
    // }); //fail
    // e.addEventListener("click", (e) => {
    //   window.open(services[index].ytlink, "_blank");
    // });
  });
}

const lang = html.getAttribute("lang");

services.forEach((service) => {
  pageTitle.insertAdjacentHTML(
    "afterend",
    buildServiceItemTemplate(service, lang == "en")
  );
  if (service.id % 2 === 0) {
    const serviceItem = document.querySelector(
      `#service-item-no-${service.id}`
    );
    serviceItem.style.backgroundColor = "#23a4a0";
  }
});
const btns = document.querySelectorAll(".img-header-btn");
btns.forEach((e, index) => {
  e.onclick = () => {
    `${window.open(services[index].ytlink, "_blank")}`;
  };
  // e.setAttribute("onclick", function () {
  //   window.open(services[index].ytlink, "_blank");
  // }); //fail
  // e.addEventListener("click", (e) => {
  //   window.open(services[index].ytlink, "_blank");
  // });
});

const observer = new MutationObserver((mutations) => {
  mutations.forEach((m) => {
    if (m.type === "attributes") {
      rebuildServices();
      // console.log("observer fired...");
    }
  });
});
observer.observe(html, {
  attributes: true, //configure it to listen to attribute changes
});
// <!-- <div class="service-item">
//         <div class="service-item-pattern-div">
//           <img src="images_webp/pattern.webp" alt="pattern opacity img" />
//         </div>
//         <div class="service-item-img-div">
//           <h3>Microscopic Varicocelectomy</h3>
//           <img
//             id="service-img-svg"
//             src="images_svg/0.svg"
//             alt="service no 0 svg"
//           />
//           <img
//             id="service-img-gif"
//             src="images_webp/0.webp"
//             alt="service img"
//           />
//           <h4 class="img-header-h4">Microscopic Varicocelectomy</h4>
//           <button class="img-header-btn">
//             <img
//               class="youtube-btn-svg-img"
//               src="images_svg/youtube.svg"
//               alt="youtube video link"
//             />
//           </button>
//           <div class="img-paragraph-div">
//             <p>
//               Varicocelectomy is a surgery performed to remove enlarged veins in
//               the spermatic cord. The procedure is done to restore proper blood
//               flow to your reproductive organs. When a varicocele develops in
//               your scrotum, it can block blood flow to the rest of your
//               reproductive system.
//             </p>
//           </div>
//         </div>
//         <div class="service-item-info-div">
//           <ul>
//             <li>
//               <div class="info-item-header-div">
//                 <div class="info-item-img-container">
//                   <img src="images_svg/bullet.svg" alt=" bullet svg" />
//                 </div>
//                 <h4>Infertility</h4>
//               </div>
//               <p>Varicocelectomy may reverse Subfertility in certain cases.</p>
//             </li>
//             <li>
//               <div class="info-item-header-div">
//                 <div class="info-item-img-container">
//                   <img src="images_svg/bullet.svg" alt=" bullet svg" />
//                 </div>
//                 <h4>Testicular Pain</h4>
//               </div>
//               <p>
//                 A high grade Varicocele maybe the cause of persistent dull
//                 aching testicular pain.
//               </p>
//             </li>
//             <li>
//               <div class="info-item-header-div">
//                 <div class="info-item-img-container">
//                   <img src="images_svg/bullet.svg" alt=" bullet svg" />
//                 </div>
//                 <h4>Surgery</h4>
//               </div>
//               <p>
//                 Microscopic Selection of veins allow for better surgical results
//                 with minimal or no postoperative pain.
//               </p>
//             </li>
//           </ul>
//         </div>
//       </div> -->
//       <div class="services-separator"></div>
