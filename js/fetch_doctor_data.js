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

export default doctorInfo;
