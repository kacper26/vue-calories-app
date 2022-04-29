import L from 'leaflet'

// helper method that allows awaiting the geolocation.getCurrentPosition request
function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error)
    )
  })
}

function vibrateSos() {
  navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100]);
}

let myMap;

function getMap(lat, lon) {
  if (myMap != undefined) {
    myMap.remove();
  }

  myMap = L.map('map').setView([lat, lon], 15);
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(myMap);
  const marker = L.marker([lat, lon]).addTo(myMap);
}

export { getCurrentPosition, vibrateSos, getMap }