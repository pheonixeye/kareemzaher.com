import { url } from "./urls.js";

class NavData {
  constructor(text, link, id) {
    this.text = text;
    this.link = link;
    this.id = id;
  }
}

const navData = [
  //todo: add 2nd link articles
  new NavData("Home", `${url}/`, "index-id"),
  new NavData("Appointments", `${url}/appointments.html`, "appointments-id"),
  new NavData("Services", `${url}/services.html`, "services-id"),
  new NavData("Articles", `${url}/articles.html`, "articles-id"),
  new NavData("Reviews", `${url}/reviews.html`, "reviews-id"),
  new NavData("Erection-Test", `${url}/erection_test.html`, "erection-test-id"),
  new NavData("Booking Complete", `${url}/thankyou.html`, "thankyou-id"),
];

export default navData;
