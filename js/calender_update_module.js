import ScheduleList from "./schedule.js";
// import doctorInfo from "./fetch_doctor_data.js";

const intDaysList = [];
ScheduleList.forEach((e) => intDaysList.push(e["intday"]));

// console.log(schedule);
function updateCalenderRealtime() {
  //TODO: modify conditioning
  const calenderItems = document.querySelectorAll(".calender-day-item");
  calenderItems.forEach((e) => {
    // console.log(e.id);
    const wdClass = e.classList[1];
    const wd = wdClass[wdClass.length - 1];
    const wdInt = parseInt(wd);
    e.classList.add("not-available");
    for (let index = 0; index < ScheduleList.length; index++) {
      const element = ScheduleList[index];
      const intDay = element["intday"];
      if (
        wdInt === intDay &&
        !e.classList.contains("m-prev") &&
        !e.classList.contains("m-next")
      ) {
        e.classList.remove("not-available");
      }
    }
  });
  for (let index = 0; index < 42; index++) {
    // const data =
    //   calenderItems[index].attributes.getNamedItem("data").textContent;
    // const itemDate = new Date(data);
    if (
      calenderItems[index].classList.contains("m-prev") ||
      calenderItems[index].classList.contains("m-next")
    ) {
      calenderItems[index].classList.add("not-available");
    }
  }
  const today = document.querySelector(".is-today");
  if (today !== undefined) {
    const todayDateData = new Date(
      today.attributes.getNamedItem("data").textContent
    );
    ScheduleList.forEach((e) => {
      const intday = e["intday"];
      if (todayDateData.getDay() === intday) {
        today.classList.remove("not-available");
      }
    });
  }

  calenderItems.forEach((e) => {
    const today = new Date();
    const itemDate = new Date(e.attributes.getNamedItem("data").textContent);

    // console.log(intDaysList);
    if (itemDate < today) {
      e.classList.add("not-available");
    }
    if (e.classList.contains("is-today")) {
      e.classList.remove("not-available");
    }
  });
  const todayItem = document.querySelector(".is-today");
  if (todayItem !== undefined) {
    const wdClass = todayItem.classList[1];
    const wd = wdClass[wdClass.length - 1];
    const wdInt = parseInt(wd);
    if (!intDaysList.includes(wdInt)) {
      todayItem.classList.add("not-available");
    }
  }
}

function main() {
  let functionExecuted = false;
  try {
    updateCalenderRealtime();
    functionExecuted = true;
  } catch (error) {
    setTimeout(() => {
      updateCalenderRealtime();
    }, 1000);
    // console.log("update pending");
  }
  if (functionExecuted) {
    return;
  }
  // console.log("update performed");
  return;
}

main();
// updateCalenderRealtime();

export default updateCalenderRealtime;
