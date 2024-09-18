// import doctorInfo from "./fetch_doctor_data.js";

// const scheduleList = doctorInfo["schedule"];

import gtag from "./gtag/src/index.js";
import { url } from "./urls.js";

const lang = document.querySelector("html").getAttribute("lang");

const isEnglish = lang === "en";

class Schedule {
  constructor(day, intday, start, end) {
    this.day = day;
    this.intday = intday;
    this.start = start;
    this.end = end;
  }

  toString() {
    return JSON.stringify(this);
  }

  static toJson(scheduleString) {
    return JSON.parse(scheduleString);
  }
}

class Appointment {
  constructor(name, phone, date, schedule) {
    this.docid = 0;
    this.docname = "kareem zaher";
    this.clinic = "urology";
    this.name = name;
    this.phone = phone;
    this.date = date;
    this.schedule = schedule;
  }

  toString() {
    return JSON.stringify(this);
  }
}

// console.log(new Appointment("abdo", "01227022248", scheduleList[0]));
let appointment;

const confirmButton = document.querySelector(".save");

confirmButton.addEventListener("click", async (e) => {
  const userName = document.getElementById("name-input").value;
  const userPhone = document.getElementById("mobile-input").value;
  const reg = new RegExp("^[0-9]+$");

  if (!userName || userName.length === 0 || userName.trim().length === 0) {
    //show modal error
    showAlertBox(
      `${isEnglish ? "Kindly Enter Your name..." : "برجاء ادخال الاسم..."}`,
      `${isEnglish ? "ERROR !!!" : "خطأ !!!"}`
    );
    return;
  } else if (!userPhone || userPhone.length !== 11 || !reg.test(userPhone)) {
    //show modal error
    showAlertBox(
      `${isEnglish
        ? "Kindly Enter a Valid Mobile Number..."
        : "برجاء ادخال رقم موبايل صحيح ..."
      }`,
      `${isEnglish ? "ERROR !!!" : "خطأ !!!"}`
    );
    return;
  }

  const dateHolder = document.querySelector(".info-date.value-date");

  const reservationDate =
    dateHolder.attributes.getNamedItem("reservation-date").textContent;
  // console.log(reservationDate);

  const selectedScheduleItem =
    dateHolder.attributes.getNamedItem("schedule-day").textContent;
  // console.log(selectedScheduleItem);

  // console.log(userName);
  // console.log(userPhone);

  appointment = new Appointment(
    userName,
    userPhone,
    reservationDate,
    Schedule.toJson(selectedScheduleItem)
  );
  // console.log(appointment);

  await sendBookingRequest(appointment);
});

async function getApiKey() {
  const url = 'https://brevo-auth.drkazgm.workers.dev/';
  const response = await fetch(url, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  },);
  const json = await response.json();
  return await json.key;
}

//book request
async function sendBookingRequest(appointment) {
  //TODO: change to clinic number
  const _url = "https://api.brevo.com/v3/smtp/email";
  const _preBody = {
    sender: {
      name: "bookings",
      email: "bookings@kareemzaher.com"
    },
    to: [
      {
        email: "drkazgm@gmail.com",
        name: "Kareem Zaher Clinic"
      }
    ],
    subject: "Hello world",
    htmlContent: `
    <html>
      <head></head>
      <body>
        <p>New Booking ${new Date().toLocaleString()}</p>
        <p>${appointment.toString()}</p>
      </body>
    </html>`,
  };
  const apiKey = await getApiKey();

  await fetch(_url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(_preBody),
  });

  // const response = await request.json();

  // gtagReportConversion();
  // console.log("gtag-called");

  showAlertBox(
    `${isEnglish ? "Booking Request Sent." : "تم ارسال طلب الحجز"}`,
    `${isEnglish ? "INFO !!!" : "اشعار !!!"}`,
    true
  );
}

function gtagReportConversion(url) {
  var callback = function () {
    if (typeof url != "undefined") {
      window.location = url;
    }
  };
  gtag("event", "conversion", {
    send_to: "AW-650293587/Vg-bCMHdicsYENPiirYC",
    event_callback: callback,
  });
  return false;
}

//form validation
function showAlertBox(message, header, redirect) {
  redirect ??= false;
  const alertOverlay = document.querySelector("#alert-overlay");
  const alertTemplate = document.querySelector("#alert-template");
  const alertHead = document.querySelector("#alert-head");
  const alertMessage = document.querySelector("#alert-body");
  alertOverlay.style.display = "block";
  alertTemplate.style.display = "block";
  alertMessage.innerText = message;

  if (header != "ERROR !!!" && header != "خطأ !!!") {
    alertHead.style.backgroundColor = "#ff9800";
  }
  alertHead.innerText = header;

  const dismissAlertBtn = document.querySelector("#alert-action-btn");
  dismissAlertBtn.addEventListener("click", (e) => {
    alertOverlay.style.display = "none";
    alertTemplate.style.display = "none";
    if (redirect) {
      location.href = `${url}/thankyou.html`;
    }
  });
}

export default Schedule;
