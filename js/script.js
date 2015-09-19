/**
This is the tutorial project for 2015-fall Purdue Ironhack, which is organized by Reserach Center of Open Digital Innovation(RCODI) at Purdue University. 
If you want to know more about the Ironhack or about the RCODI, please find our website here: https://www.purdue.edu/opendigital/
You can checkout the code for this project on github: https://github.com/charlessong0/2015-Purdue-Ironhack
The demo page of this project is located at: http://test.rcodi.charlessong.me/

This is the javascript file for the radar chart。 We can define the content of the chart here. We can also defind the numbers by accessing external links and resources such as JSON files.
**/

var xmlhttp,
	url;
//create a new httprequest for this session
xmlhttp = new XMLHttpRequest();
//json format data resource url
url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fw1.weather.gov%2Fobhistory%2FKLAF.html'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"; 
//url = "http://api.openweathermap.org/data/2.5/weather?q=chicago";
xmlhttp.open("GET", url, true);
xmlhttp.send();

//once the request is accepted, process the fowllowing function to get data and complete the app information
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    	var myArr,
    		json,
    		w = 0,
			h = 0,
			svg,
			colorscale,
			titleOptions,
			titleText,
			title;
		vartext = "";
        
        myArr = xmlhttp.responseText;
        text = myArr;
        json = JSON.parse(text);
        //alert(JSON.parse(text).coord.lon);
        //document.getElementById("id01").innerHTML = myArr;
    
        //document.getElementById("weather").innerHTML = "Today the weather is " + json.weather[0].main + " and HOT!";
        document.getElementById("weather").innerHTML = "Today the weather is " + json.query.results.body.table[3].tbody.tr[3].td[4].content;
		//
		//variables for the title
		//
		var 

		//initiate the title
		svg = d3.select('#body')
			.selectAll('svg')
			.append('svg')
			.attr("width", 300)
			.attr("height", 300)

		//variables for creating colour squares
		colorscale = d3.scale.category10();

		//titles
		titleOptions = ['Final Scores'];
		titleText = svg.append("text")
			.attr("class", "title")
			.attr('transform', 'translate(90,0)') 
			.attr("x", w-70)
			.attr("y", 10)
			.attr("font-size", "12px")
			.attr("fill", "#404040")
			.text("Find your best place to get food!");
				
		//Initiate title	
		title = svg.append("g")
			.attr("class", "title")
			.attr("height", 100)
			.attr("width", 200)
			.attr('transform', 'translate(90,20)') 
			;
			//Create colour squares
		title.selectAll('rect')
		  .data(titleOptions)
		  .enter()
		  .append("rect")
		  .attr("x", w - 65)
		  .attr("y", function(d, i){ return i * 20;})
		  .attr("width", 10)
		  .attr("height", 10)
		  .style("fill", function(d, i){ return colorscale(i);})
		  ;
		//Create text next to squares
		title.selectAll('text')
		  .data(titleOptions)
		  .enter()
		  .append("text")
		  .attr("x", w - 52)
		  .attr("y", function(d, i){ return i * 20 + 9;})
		  .attr("font-size", "13px")
		  .attr("fill", "#737373")
		  .text(function(d) { return d; })
		  ;	
    }
};

// those are functions for calculating scores for each store
function calculateScore() {
	return 0;
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




