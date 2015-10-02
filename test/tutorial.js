var elevator;
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.4219, lng: -86.9125},
    zoom: 16
  });

  var markers = [];
google.maps.event.addListener(map, 'idle', function()
{
    // Create an ElevationService
    elevator = new google.maps.ElevationService();
    $.each(markers, function(key, value)
    {
        value.setMap(null);
    });
    // getting bounds of current location
    var boundBox = map.getBounds();
    var southWest = boundBox.getSouthWest();
    var northEast = boundBox.getNorthEast();
    var lngSpan = northEast.lng() - southWest.lng();
    var latSpan = northEast.lat() - southWest.lat();
    // adding 20 markers to the map at random locations
    var locations = [];
    for (var j = 0; j < 10; j++)
    {
        var location = new google.maps.LatLng(
                southWest.lat() + latSpan * Math.random(),
                southWest.lng() + lngSpan * Math.random()
                );
        locations.push(location);
    }

    // Create a LocationElevationRequest object using the array's one value
    var positionalRequest = {
        'locations': locations
    };

    elevator.getElevationForLocations(positionalRequest, function(results, status)
    {
        if (status === google.maps.ElevationStatus.OK)
        {
            $.each(results, function(key, value)
            {
                    //alert(key);
                    markers[key] = new google.maps.Marker({
                        position: value.location,
                        map: map,
                        icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + key.toString()).slice(-2) + '.png'
                    });
                
            });
        }
    });
});
}

// Add a listener for idle event and call getElevation on a random set of marker in the bound





