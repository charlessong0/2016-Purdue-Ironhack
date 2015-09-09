/**
2015-09-07 by Charles Song
This is the javascript file for the Google map.
The position for the map and chart will be changed in the final project. Generally the chart will show up once you click the lable in the map.
**/

//variables for map and marks
var elevator;
var map;
// 2-level array for washed markets data
var washedData = [];

//init the google map in the webpage
function initMap() {
    //create the google map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.85081542, lng: -87.69123528},
        zoom: 12
    });
    //create a marker at the centre
    var marker = new google.maps.Marker({
        position: {lat: 41.85081542, lng: -87.69123528},
        map: map,
        title: 'Chicago'
    });

    //create a new httprequest for this session
    var xmlhttp = new XMLHttpRequest();
    //json format data resource url 
    var url = "https://data.cityofchicago.org/api/views/hu6v-hsqb/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    //once the request is accepted, process the fowllowing function to get data and complete the app information
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
            alert(json.data[1][1]);
            //document.getElementById("id01").innerHTML = myArr;
            
            //
            //add the information of the markets here 
            //
            for (var i = 0; i<44; i++) {
                var dataLine = [];
                //latitude
                dataLine.push(json.data[i][18]);
                //longitude
                dataLine.push(json.data[i][19]);
                //name
                dataLine.push(json.data[i][8]);
                //street
                dataLine.push(json.data[i][9]);
                //day in week
                dataLine.push(json.data[i][10]);
                //start time
                dataLine.push(json.data[i][11]);
                //end time
                dataLine.push(json.data[i][12]);
                //start date
                dataLine.push(json.data[i][13]);
                //end date
                dataLine.push(json.data[i][14]);
                //website
                dataLine.push(json.data[i][15][1]);

                washedData.push(dataLine);
            };
            alert(washedData);

            var numberOfMarkets = washedData.length;

            //add markers on the map
            var markers = [];
            google.maps.event.addListener(map, 'idle', function() {
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
            for (var j = 0; j < numberOfMarkets; j++)
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
                    
                    $.each(results, function(key, value) {
                        var infowindow = new google.maps.InfoWindow({
                            content: washedData[key][2]
                        });
                        //alert(key);
                        markers[key] = new google.maps.Marker({
                            position: {lat: Number(washedData[key][0]), lng: Number(washedData[key][1])},
                            map: map,
                            icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + key.toString()).slice(-2) + '.png'
                        });
                        google.maps.event.addListener(markers[key], 'click', function() {
                            infowindow.open(map, markers[key]);
                        });
                        
                    });
                }
            });
        });


        }
    };

}

//show the request function in the text format
function myRequestFunction(arr) {
        var out = "";
        var i;
        for(i = 0; i < arr.length; i++) {
            out += '<a href="' + arr[i].url + '">' + 
            arr[i].display + '</a><br>';
        }
        document.getElementById("id01").innerHTML = out;
    }
// Add a listener for idle event and call getElevation on a random set of marker in the bound







