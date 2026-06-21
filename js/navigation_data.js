import { url } from "./urls.js";

class NavData {
  constructor(text, link, id, arText) {
    this.text = text;
    this.link = link;
    this.id = id;
    this.arText = arText;
  }
}

const navData = [
  //todo: add 2nd link articles
  new NavData("Home", `${url}/`, "index-id", "الرئيسية"),
  new NavData("Appointments", `${url}/appointments.html`, "appointments-id", "حجز موعد"),
  new NavData("Services", `${url}/services.html`, "services-id", "الخدمات"),
  new NavData("Articles", `${url}/articles.html`, "articles-id", "المقالات"),
  new NavData("Reviews", `${url}/reviews.html`, "reviews-id", "المراجعات"),
  new NavData("Erection-Test", `${url}/erection_test.html`, "erection-test-id", "اختبار الانتصاب"),
  new NavData("Booking Complete", `${url}/thankyou.html`, "thankyou-id", "Booking Complete"),
];

export default navData;
