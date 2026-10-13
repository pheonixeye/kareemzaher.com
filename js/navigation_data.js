import { url } from "./urls.js";

const iconAttrs = `class="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;

const homeIcon = `<svg ${iconAttrs}><path d="M3 10.5 12 3l9 7.5" /><path d="M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" /><path d="M9.75 21v-5.5h4.5V21" /></svg>`;

const appointmentsIcon = `<svg ${iconAttrs}><rect x="3" y="4.5" width="18" height="16.5" rx="2" /><path d="M3 9.5h18" /><path d="M8 2.5v4" /><path d="M16 2.5v4" /></svg>`;

const servicesIcon = `<svg ${iconAttrs}><rect x="3" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" /></svg>`;

const articlesIcon = `<svg ${iconAttrs}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4" /><path d="M9 12h6" /><path d="M9 16h6" /></svg>`;

const reviewsIcon = `<svg ${iconAttrs}><path d="m12 3.5 2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 16.77 6.8 19.5l.99-5.79-4.21-4.1 5.82-.85z" /></svg>`;

const testIcon = `<svg ${iconAttrs}><path d="M3 12h4l2-6 4 12 2-6h6" /></svg>`;

class NavData {
  constructor(text, link, id, arText, icon, shortArText) {
    this.text = text;
    this.link = link;
    this.id = id;
    this.arText = arText;
    this.icon = icon;
    this.shortArText = shortArText;
  }
}

const navData = [
  //todo: add 2nd link articles
  new NavData("Home", `${url}/`, "index-id", "الرئيسية", homeIcon, "الرئيسية"),
  new NavData(
    "Appointments",
    `${url}/appointments.html`,
    "appointments-id",
    "حجز موعد",
    appointmentsIcon,
    "حجز"
  ),
  new NavData(
    "Services",
    `${url}/services.html`,
    "services-id",
    "الخدمات",
    servicesIcon,
    "الخدمات"
  ),
  new NavData(
    "Articles",
    `${url}/articles.html`,
    "articles-id",
    "المقالات",
    articlesIcon,
    "مقالات"
  ),
  new NavData(
    "Reviews",
    `${url}/reviews.html`,
    "reviews-id",
    "المراجعات",
    reviewsIcon,
    "مراجعات"
  ),
  new NavData(
    "Erection-Test",
    `${url}/erection_test.html`,
    "erection-test-id",
    "اختبار الانتصاب",
    testIcon,
    "الاختبار"
  ),
  new NavData("Booking Complete", `${url}/thankyou.html`, "thankyou-id", "Booking Complete"),
];

export default navData;
