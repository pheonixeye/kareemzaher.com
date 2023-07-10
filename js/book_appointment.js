import doctorInfo from "./fetch_doctor_data.js";

const scheduleList = doctorInfo["schedule"];

class Schedule {
  constructor(day, intday, start, end) {
    this.day = day;
    this.intday = intday;
    this.start = start;
    this.end = end;
  }
}

class Appointment {
  constructor(name, phone, schedule) {
    this.docid = 111111;
    this.docname = "kareem zaher";
    this.clinic = "urology";
    this.name = name;
    this.phone = phone;
    this.schedule = schedule;
  }
}

// console.log(new Appointment("abdo", "01227022248", scheduleList[0]));

const confirmButton = document.querySelector(".save");

confirmButton.addEventListener("click", (e) => {
  const userName = document.getElementById("name-input").value;

  const userPhone = document.getElementById("mobile-input").value;

  const dateHolder = document.querySelector(".info-date span");

  const reservationDate = dateHolder.getAttribute("reservation-date");

  const selectedScheduleItem = dateHolder.getAttribute("schedule-day");

  console.log(userName);
  console.log(userPhone);
  console.log(reservationDate);
  console.log(selectedScheduleItem);
});

export default Schedule;
