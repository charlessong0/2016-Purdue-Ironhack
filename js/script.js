/**
2015-09-07 by Charles Song
This is the javascript file for the radar chart。 We can define the content of the chart here. We can also defind the numbers by accessing external links and resources such as JSON files.
Functions for JSON file parsing is on developing(2015-09-07)
**/


//create a new httprequest for this session
var xmlhttp = new XMLHttpRequest();
//json format data resource url 
var url = "http://api.openweathermap.org/data/2.5/weather?q=chicago";
xmlhttp.open("GET", url, true);
xmlhttp.send();

//once the request is accepted, process the fowllowing function to get data and complete the app information
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        alert(JSON.parse(text).coord.lon);
        //document.getElementById("id01").innerHTML = myArr;
    
        //define the basic width and height for the chart (in px)
		var w = 250,
		h = 250;

		//dtata - scored stores
		//we will use scoring algorithm to get these value in the final project
		var d = [
				  [
					{axis:"Open hours",value:0.4},
					{axis:"Availability",value:0.03},
					{axis:"Freshness",value:0.22},
					{axis:"Distance",value:0.03},
					{axis:"Prices",value:0.03},
					{axis:"Customer ratings",value:0.07},
					{axis:"Personal preference",value:0.18},
					{axis:"Other",value:0.07},
					{axis:"service",value:0.08}
				  ]
				];

		//Options for the Radar chart, other than default
		var mycfg = {
		  w: w,
		  h: h,
		  maxValue: 0.6,
		  levels: 6,
		  ExtraWidthX: 300
		}

		//Call function to draw the Radar chart
		//Will expect that data is in %'s
		RadarChart.draw("#chart", d, mycfg);


		//
		//variables for the title
		//

		//initiate the title
		var svg = d3.select('#body')
			.selectAll('svg')
			.append('svg')
			.attr("width", w+300)
			.attr("height", h)


		//variables for creating colour squares
		var colorscale = d3.scale.category10();

		//titles
		var titleOptions = ['Final Scores'];
		var text = svg.append("text")
			.attr("class", "title")
			.attr('transform', 'translate(90,0)') 
			.attr("x", w-70)
			.attr("y", 10)
			.attr("font-size", "12px")
			.attr("fill", "#404040")
			.text("Find your best place to get food!");
				
		//Initiate title	
		var title = svg.append("g")
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

		// those are functions for calculating scores for each store


    }


};

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




