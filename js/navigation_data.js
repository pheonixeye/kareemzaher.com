class NavData {
  constructor(text, link, id) {
    this.text = text;
    this.link = link;
    this.id = id;
  }
}

const navData = [
  //TODO: add 2nd link articles
  new NavData("Home", "./", "index-id"),
  new NavData("Appointments", "appointments.html", "appointments-id"),
  new NavData("Services", "services.html", "services-id"),
  new NavData("Articles", "articles.html", "articles-id"),
  new NavData("Reviews", "reviews.html", "reviews-id"),
  new NavData("Erection-Test", "erection_test.html", "erection-test-id"),
  new NavData("Booking Complete", "thankyou.html", "thankyou-id"),
];

export default navData;
