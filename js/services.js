console.log("services connected");

const servicesPageContent = document.querySelector(
  "#services-id .page-content"
);
servicesPageContent.style.backgroundColor = "#f6f6f6";

class ServiceInfo {
  constructor(title, text) {
    this.title = title;
    this.text = text;
  }
}

class Service {
  constructor(id, title, svg, img, ytLik, paragraph, serviceInfo) {
    this.id = id;
    this.title = title;
    this.svg = svg;
    this.img = img;
    this.ytLik = ytLik;
    this.paragraph = paragraph;
    this.serviceInfo = serviceInfo;
  }
}

const services = [
  new Service(
    0,
    "Microscopic Varicocelectomy",
    "images_svg/0.svg",
    "images_webp/0.webp",
    "https://www.youtube.com/watch?v=d4_LnU43yzU&ab_channel=NucleusMedicalMedia",
    "Varicocelectomy is a surgery performed to remove enlarged veins in the spermatic cord. The procedure is done to restore proper blood flow to your reproductive organs. When a varicocele develops in your scrotum, it can block blood flow to the rest of your reproductive system.",
    [
      new ServiceInfo(
        "Infertility",
        "Varicocelectomy may reverse Subfertility in certain cases."
      ),
      new ServiceInfo(
        "Testicular Pain",
        "A high grade Varicocele maybe the cause of persistent dull aching testicular pain."
      ),
      new ServiceInfo(
        "Varicocele Surgery",
        "Microscopic Selection of veins allow for better surgical results with minimal or no postoperative pain."
      ),
    ]
  ),
];
