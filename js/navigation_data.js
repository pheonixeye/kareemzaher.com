class NavData {
  constructor(text, link, id) {
    this.text = text;
    this.link = link;
    this.id = id;
  }
}

const navData = [
  new NavData("Home", "./", "index-id"),
  new NavData("Appointments", "appointments.html", "appointments-id"),
  new NavData("Services", "services.html", "services-id"),
  new NavData("Articles", "articles.html", "articles-id"),
  new NavData("Reviews", "reviews.html", "reviews-id"),
  new NavData("Erection-Test", "erection_test.html", "erection-test-id"),
];

export default navData;
