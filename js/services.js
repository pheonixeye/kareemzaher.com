import data from "../json/services.json" assert { type: "json" };

console.log("services connected");

const servicesPageContent = document.querySelector(
  "#services-id .page-content"
);
servicesPageContent.style.backgroundColor = "#f6f6f6";

const services = data;

function buildServiceItemTemplate(dataItem) {
  const serviceItemTemplate = `
<div class="service-item" id="service-item-no-${dataItem.id}">
 <div class="service-item-pattern-div">
   <img src="images_webp/pattern.webp" alt="pattern opacity img" />
 </div>
 <div class="service-item-img-div">
   <h3>${dataItem.entitle}</h3>
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
   <h4 class="img-header-h4">${dataItem.entitle}</h4>
   <button class="img-header-btn"
   type="button" onclick="">
     <img
       class="youtube-btn-svg-img"
       src="images_svg/youtube.svg"
       alt="youtube video link"
     />
   </button>
   <div class="img-paragraph-div">
     <p>
      ${dataItem.enparagraph}
     </p>
   </div>
 </div>
 <div class="service-item-info-div">
   <ul>
     <li>
       <div class="info-item-header-div">
         <div class="info-item-img-container">
           <img src="images_svg/bullet.svg" alt=" bullet svg" />
         </div>
         <h4>${dataItem.info[0].entitle}</h4>
       </div>
       <p>${dataItem.info[0].entext}</p>
     </li>
     <li>
       <div class="info-item-header-div">
         <div class="info-item-img-container">
           <img src="images_svg/bullet.svg" alt=" bullet svg" />
         </div>
         <h4>${dataItem.info[1].entitle}</h4>
       </div>
       <p>
       ${dataItem.info[1].entext}
       </p>
     </li>
     <li>
       <div class="info-item-header-div">
         <div class="info-item-img-container">
           <img src="images_svg/bullet.svg" alt=" bullet svg" />
         </div>
         <h4>${dataItem.info[2].entitle}</h4>
       </div>
       <p>
       ${dataItem.info[2].entext}
       </p>
     </li>
     ${
       dataItem.info[3] != undefined
         ? `<li>
           <div class="info-item-header-div">
             <div class="info-item-img-container">
               <img src="images_svg/bullet.svg" alt=" bullet svg" />
             </div>
             <h4>${dataItem.info[3].entitle}</h4>
           </div>
           <p>${dataItem.info[3].entext}</p>
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

const firstSeparator = document.querySelector(".services-separator");

services.forEach((service) => {
  firstSeparator.insertAdjacentHTML(
    "afterend",
    buildServiceItemTemplate(service)
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
  e.addEventListener("click", (event) => {
    window.open(services[index].ytlink, "_blank");
  });
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
