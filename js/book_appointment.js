import doctorInfo from "./fetch_doctor_data.js";

// const scheduleList = doctorInfo["schedule"];

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
    this.docid = 111111;
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

confirmButton.addEventListener("click", (e) => {
  const userName = document.getElementById("name-input").value;

  if (!userName || userName.length == 0 || userName.trim().length) {
    //TODO: show modal error

    showAlertBox("Kindly Enter Your name...");
    return;
  }

  const reg = new RegExp("^[0-9]+$");
  const userPhone = document.getElementById("mobile-input").value;
  if (!userPhone || userPhone.length !== 11 || !reg.test(userPhone)) {
    //TODO: show modal error

    showAlertBox("Kindly Enter a Valid Mobile Number...");
    return;
  }

  const dateHolder = document.querySelector(".info-date span");

  const reservationDate = dateHolder.getAttribute("reservation-date");

  const selectedScheduleItem = dateHolder.getAttribute("schedule-day");

  // console.log(userName);
  // console.log(userPhone);
  // console.log(reservationDate);
  // console.log(selectedScheduleItem);

  appointment = new Appointment(
    userName,
    userPhone,
    reservationDate,
    Schedule.toJson(selectedScheduleItem)
  );

  console.log(appointment);
});

function sendBookingRequest(params) {}

function showAlertBox(message) {
  const alertOverlay = document.querySelector("#alert-overlay");
  const alertTemplate = document.querySelector("#alert-template");
  const alertMessage = document.querySelector("#alert-body");
  alertOverlay.style.display = "block";
  alertTemplate.style.display = "block";
  alertMessage.innerText = message;

  const dismissAlertBtn = document.querySelector("#alert-action-btn");
  dismissAlertBtn.addEventListener("click", (e) => {
    alertOverlay.style.display = "none";
    alertTemplate.style.display = "none";
  });
}

export default Schedule;
