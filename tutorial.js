var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.4219, lng: -86.9125},
    zoom: 16
  });
}
