// import doctorInfo from "./fetch_doctor_data.js";

// const scheduleList = doctorInfo["schedule"];

import gtag from "./gtag/src/index.js";
import { url } from "./urls.js";

const lang = document.querySelector("html").getAttribute("lang");

const isEnglish = lang === "en";

const sch = [
  {
    created_at: "2025-06-11 21:31:58.27528+00",
    clinic_id: "ca0d0cad-3947-4df8-992c-386aec701810",
    weekday_en: "Saturday",
    weekday_ar: "السبت",
    intday: 6,
    start_min: 0,
    start_hour: 19,
    end_min: 0,
    end_hour: 22,
    available: true,
    id: "0a569ca0-4199-4d33-9ead-79d928585bf1",
  },
  {
    created_at: "2025-06-11 21:32:19.099256+00",
    clinic_id: "ca0d0cad-3947-4df8-992c-386aec701810",
    weekday_en: "Wednesday",
    weekday_ar: "الاربعاء",
    intday: 3,
    start_min: 0,
    start_hour: 19,
    end_min: 0,
    end_hour: 22,
    available: true,
    id: "46b66fd9-22c6-44b4-9dd5-f8dbb299762d",
  },
  {
    created_at: "2025-06-11 21:32:31.946799+00",
    clinic_id: "ca0d0cad-3947-4df8-992c-386aec701810",
    weekday_en: "Thursday",
    weekday_ar: "الخميس",
    intday: 4,
    start_min: 0,
    start_hour: 19,
    end_min: 0,
    end_hour: 22,
    available: true,
    id: "615d5495-cf8c-4399-95f2-5104dd477df3",
  },
  {
    created_at: "2025-06-11 21:32:09.530985+00",
    clinic_id: "ca0d0cad-3947-4df8-992c-386aec701810",
    weekday_en: "Tuesday",
    weekday_ar: "الثلاثاء",
    intday: 2,
    start_min: 0,
    start_hour: 19,
    end_min: 0,
    end_hour: 22,
    available: true,
    id: "85cc5b2c-0662-42f8-a8a1-02919066aeb6",
  },
];

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
    this.docid = "ce5d632d-4613-4b5b-962b-b2099f67510b";
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

class SPAppointment {
  constructor(name, phone, date, schedule_id) {
    this.doc_id = "e42e55de-c305-448a-8961-085a38357341";
    this.clinic_id = "ca0d0cad-3947-4df8-992c-386aec701810";
    this.schedule_id = schedule_id;
    this.name = name;
    this.phone = phone;
    this.date = date;
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
      `${isEnglish ? "ERROR !!!" : "خطأ !!!"}`,
    );
    return;
  } else if (!userPhone || userPhone.length !== 11 || !reg.test(userPhone)) {
    //show modal error
    showAlertBox(
      `${
        isEnglish
          ? "Kindly Enter a Valid Mobile Number..."
          : "برجاء ادخال رقم موبايل صحيح ..."
      }`,
      `${isEnglish ? "ERROR !!!" : "خطأ !!!"}`,
    );
    return;
  }

  const dateHolder = document.querySelector(".info-date.value-date");

  const reservationDate =
    dateHolder.attributes.getNamedItem("reservation-date").textContent;
  // console.log(reservationDate);

  const selectedScheduleItem = JSON.parse(
    dateHolder.attributes.getNamedItem("schedule-day").value,
  );
  // console.log(selectedScheduleItem);

  // console.log(userName);
  // console.log(userPhone);

  appointment = new SPAppointment(
    userName,
    userPhone,
    reservationDate,
    sch.find((item) => item.weekday_en === selectedScheduleItem.day).id,
  );
  // console.log(appointment);

  await sendBookingRequest(appointment);
});

//book request
async function sendBookingRequest(appointment) {
  //TODO: change to clinic number
  const _url = "https://n8n.prkln.app/webhook/sms";

  fetch(_url, {
    method: "POST",
    headers: {
      accept: "application/json",
      origin: "https://kareemzaher.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });
  // console.log(response.json());
  // const response = await request.json();

  // gtagReportConversion();
  // console.log("gtag-called");

  showAlertBox(
    `${isEnglish ? "Booking Request Sent." : "تم ارسال طلب الحجز"}`,
    `${isEnglish ? "INFO !!!" : "اشعار !!!"}`,
    true,
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
