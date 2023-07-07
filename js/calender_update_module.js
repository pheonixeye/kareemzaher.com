const _url = "https://cosmosurgeserver.xyz/cpanel";
const _body = {
  _id: 111111,
};

var doctorInfo = {};

async function fetchDoctorData() {
  const request = await fetch(_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(_body),
  });
  var response = await request.json().then((data) => (doctorInfo = data));
  return response;
}

await fetchDoctorData().then((data) => {
  doctorInfo = data;
});
const schedule = doctorInfo["schedule"];

console.log(schedule);
function updateCalenderRealtime() {
  //TODO: modify conditioning
  const calenderItems = document.querySelectorAll(".calender-day-item");
  calenderItems.forEach((e) => {
    const wdClass = e.classList[1];
    const wd = wdClass[wdClass.length - 1];
    const wdInt = parseInt(wd);
    e.classList.add("not-available");
    for (let index = 0; index < schedule.length; index++) {
      const element = schedule[index];
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
    const data =
      calenderItems[index].attributes.getNamedItem("data").textContent;
    const itemDate = new Date(data);

    calenderItems[index].classList.add("not-available");
    if (calenderItems[index].classList.contains("is-today")) {
      console.log(itemDate);
      break;
    }
  }
  const today = document.querySelector(".is-today");
  const todayDateData = new Date(
    today.attributes.getNamedItem("data").textContent
  );
  schedule.forEach((e) => {
    const intday = e["intday"];
    if (todayDateData.getDay() === intday) {
      today.classList.remove("not-available");
    }
  });
}

updateCalenderRealtime();

// export default updateCalenderRealtime;
