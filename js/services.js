/* eslint-disable no-unused-expressions */
import { services } from "./services_data.js";
import { url } from "./urls.js";

const servicesPageContent = document.querySelector(
  "#services-id .page-content"
);

const html = document.querySelector("html");
const pageTitle = document.querySelector("#services-title");

let servicesContainer = document.querySelector(".services-container");
if (!servicesContainer) {
  servicesContainer = document.createElement("div");
  servicesContainer.className = "services-container";
  pageTitle.insertAdjacentElement("afterend", servicesContainer);
}

function buildServiceItemTemplate(dataItem, isEnglish) {
  return /*html*/ `
<div class="service-item" id="service-item-no-${dataItem.id}">
  <div class="service-card">
    <div class="service-media">
      <img
        class="service-main-img"
        src="${url}/${dataItem.img}"
        alt="${isEnglish ? dataItem.entitle : dataItem.artitle}"
      />
      <div class="service-media-overlay">
        <button class="youtube-btn" type="button" aria-label="Watch video" data-ytlink="${dataItem.ytlink}">
          <svg class="youtube-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
           <span class="youtube-btn-text">${isEnglish ? 'Watch Video' : 'شاهد الفيديو'}</span>
        </button>
      </div>
    </div>
    
    <div class="service-content">
      <div class="service-header">
        <img class="service-icon" src="${url}/${dataItem.svg}" alt="icon" />
        <h3 class="service-title">${isEnglish ? dataItem.entitle : dataItem.artitle}</h3>
      </div>
      
      <p class="service-description">
        ${isEnglish ? dataItem.enparagraph : dataItem.arparagraph}
      </p>
      
      <div class="service-features">
        ${dataItem.info.map(infoItem => `
          <div class="feature-item">
             <div class="feature-icon-wrapper">
               <svg class="feature-bullet" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
             </div>
             <div class="feature-text">
               <h4>${isEnglish ? infoItem.entitle : infoItem.artitle}</h4>
               <p>${isEnglish ? infoItem.entext : infoItem.artext}</p>
             </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</div>
`;
}

function rebuildServices() {
  const isEnglish = html.getAttribute("lang") === "en";
  servicesContainer.innerHTML = '';

  services.forEach((service) => {
    servicesContainer.insertAdjacentHTML(
      "beforeend",
      buildServiceItemTemplate(service, isEnglish)
    );
  });
  
  const btns = servicesContainer.querySelectorAll(".youtube-btn");
  btns.forEach(btn => {
    btn.onclick = () => {
      window.open(btn.getAttribute("data-ytlink"), "_blank");
    };
  });
}

function scrollToHash() {
  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 600);
    }
  }
}

// Initial build
rebuildServices();
scrollToHash();

const observer = new MutationObserver((mutations) => {
  mutations.forEach((m) => {
    if (m.type === "attributes" && m.attributeName === "lang") {
      rebuildServices();
    }
  });
});
observer.observe(html, {
  attributes: true
});
