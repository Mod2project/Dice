
let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
    console.log(Map)
  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
  const marker = new google.maps.Marker({
    position: {lat: 43.542194, lng: -5.676875},
    map: map,
title: 'Acuario de Gijón'
  });
}

initMap();