/**
This is the tutorial project for 2015-fall Purdue Ironhack, which is organized by Reserach Center of Open Digital Innovation(RCODI) at Purdue University. 
If you want to know more about the Ironhack or about the RCODI, please find our website here: https://www.purdue.edu/opendigital/
You can checkout the code for this project on github: https://github.com/charlessong0/2015-Purdue-Ironhack
The demo page of this project is located at: http://test.rcodi.charlessong.me/

This is the javascript file for the Google map.
The position for the map and chart will be changed in the final project. Generally the chart will show up once you click the lable in the map.
**/


//init the google map in the webpage         
function initMap() {

    alert(timeStamp());
    //variables for map and marks
    var elevator,
        map,
        marker,
        infowindow,
        xmlhttp,
        url = "";

    //create the google map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.85081542, lng: -87.69123528},
        zoom: 12
    });
    //create a marker at the centre
    marker = new google.maps.Marker({
        position: {lat: 41.85081542, lng: -87.69123528},
        map: map,
        title: 'Chicago'
    });

    infowindow = new google.maps.InfoWindow({
                            content: ""
                        });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent("Chicago City");
                            infowindow.open(map, marker);
                        });

    //create a new httprequest for this session
    xmlhttp = new XMLHttpRequest();
    //json format data resource url 
    //url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fw1.weather.gov%2Fobhistory%2FKLAF.html'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    url = "https://data.cityofchicago.org/api/views/x5xx-pszi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    //once the request is accepted, process the fowllowing function to get data and complete the app information
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the text content from the page response
            var myArr,
                text,
                json,
                numberOfMarkets = 0,
                markers = [],
                boundBox,
                southWest,
                northEast,
                lngSpan = 0,
                latSpan = 0,
                locations = [];

            myArr = xmlhttp.responseText;
            text = myArr;
            //alert(text);
            json = JSON.parse(text);
            

            
            //alert(json.data[1][1]);
            //document.getElementById("id01").innerHTML = myArr;
            
            //
            //add the information of the markets here 
            //

            var i = 0,
                // 2-level array for washed markets data
                washedData = [];
            for (i = 0; i<44; i++) {
                var dataLine = [];
                //latitude - 0
                dataLine.push(json.data[i][18]);
                //longitude - 1
                dataLine.push(json.data[i][19]);
                //name - 2
                dataLine.push(json.data[i][8]);
                //street - 3
                dataLine.push(json.data[i][9]);
                //day in week - 4
                dataLine.push(json.data[i][10]);
                //start time - 5
                dataLine.push(json.data[i][11]);
                //end time - 6
                dataLine.push(json.data[i][12]);
                //start date -7
                dataLine.push(json.data[i][13]);
                //end date - 8
                dataLine.push(json.data[i][14]);
                //website - 9
                dataLine.push(json.data[i][15][0]);

                washedData.push(dataLine);
            };
            //alert(washedData);
            //number of the markets
            numberOfMarkets = washedData.length;

            //add markers on the map
            google.maps.event.addListener(map, 'idle', function() {
            // Create an ElevationService
            elevator = new google.maps.ElevationService();
            $.each(markers, function(key, value)
            {
                value.setMap(null);
            });
            // getting bounds of current location
            boundBox = map.getBounds();
            southWest = boundBox.getSouthWest();
            northEast = boundBox.getNorthEast();
            lngSpan = northEast.lng() - southWest.lng();
            latSpan = northEast.lat() - southWest.lat();
            // adding 20 markers to the map at random locations

            var j = 0,
                location,
                positionalRequest,
                prev_infowindow =false;
            for (var j = 0; j < numberOfMarkets; j++)
            {
                location = new google.maps.LatLng(
                        southWest.lat() + latSpan * Math.random(),
                        southWest.lng() + lngSpan * Math.random()
                        );
                locations.push(location);
            }

            // Create a LocationElevationRequest object using the array's one value

            positionalRequest= {
                'locations': locations
            };
            elevator.getElevationForLocations(positionalRequest, function(results, status)
            {
                if (status === google.maps.ElevationStatus.OK)
                {
                    //if the infowindow is open
                    prev_infowindow =false;

                    $.each(results, function(key, value) {

                        //alert(key);
                        markers[key] = new google.maps.Marker({
                            position: {lat: Number(washedData[key][0]), lng: Number(washedData[key][1])},
                            map: map,
                            icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + key.toString()).slice(-2) + '.png'
                        });
                        google.maps.event.addListener(markers[key], 'click', function() {
                            //if another window is open, close it
                            if( prev_infowindow ) {
                                prev_infowindow.close();
                            }
                            infowindow.setContent(washedData[key][2]);
                            infowindow.open(map, markers[key]);
                            //set the menu information about the market
                            document.getElementById("market-name").innerHTML = washedData[key][2];
                            document.getElementById("street-name").innerHTML = washedData[key][3];
                            document.getElementById("website").innerHTML = "<a href=\"" + washedData[key][9] + "\">" + washedData[key][9] + "</a>";
                            document.getElementById("open-status").innerHTML = "Today the market is " + contain(washedData[key][4], day());

                            //dtata - scored stores
                            //you will use scoring algorithm to get these value in the final project
                            //here we only use random method to show the process
                            var w = 200,
                                h = 250,
                                array  = [],
                                i = 0,
                                d,
                                mycfg;

                            for (i = 0; i<9; i++) {
                                array[i] = Math.random();
                            }
                            d = [
                                [
                                    {axis:"Open hours",value:array[0]},
                                    {axis:"Availability",value:array[1]},
                                    {axis:"Freshness",value:array[2]},
                                    {axis:"Distance",value:array[3]},
                                    {axis:"Prices",value:array[4]},
                                    {axis:"Customer ratings",value:array[5]},
                                    {axis:"Personal preference",value:array[6]},
                                    {axis:"Other",value:array[7]},
                                    {axis:"service",value:array[8]}
                                ]
                            ];

                            document.getElementById("scores").innerHTML = "The final score for this market is " + parseInt(score(array)*100) + " out of 100";
                            document.getElementById("comments").innerHTML = "Please find the comments by customers here:";

                            //Options for the Radar chart, other than default
                            mycfg = {
                              w: w,
                              h: h,
                              maxValue: 0.6,
                              levels: 6,
                              ExtraWidthX: 200
                            }

                            //Call function to draw the Radar chart
                            //Will expect that data is in %'s
                            RadarChart.draw("#chart", d, mycfg);
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

//get the result of whether contains a substring
function contain(str, substr) {
    if(str.indexOf(substr) > -1)
        return "open";
    else
        return "closed";
}

//get the day in a week by the number
function day() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[d.getDay()];
}

//the algorithm for scoring
//you should create your own reasonable methods for calculating scores
function score(data) {
    return data[0]*0.1 + data[2]*0.01 + data[3]*0.11 + data[1]*0.1 + data[4]*0.2 + data[5]*0.1 + data[6]*0.2 + data[7]*0.01 + data[8]*0.01;
}

function timeStamp() {
// Create a date object with the current time
  var now = new Date();

// Create an array with the current month, day and time
  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

// Create an array with the current hour, minute and second
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

// Determine AM or PM suffix based on the hour
  var suffix = ( time[0] < 12 ) ? "AM" : "PM";

// Convert hour from military time
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

// If hour is 0, set it to 12
  time[0] = time[0] || 12;

// If seconds and minutes are less than 10, add a zero
  for ( var i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }
// Return the formatted string
  return date.join("/") + " " + time.join(":") + " " + suffix;
}



