const _url = "https://cosmosurgebasicserver.fly.dev/cpanel";
const _body = {
  _id: 111111,
};

let doctorInfo = {};

async function fetchDoctorData() {
  const request = await fetch(_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(_body),
  });
  const response = await request.json().then((data) => (doctorInfo = data));
  return response;
}

await fetchDoctorData().then((data) => {
  doctorInfo = data;
});

export default doctorInfo;
