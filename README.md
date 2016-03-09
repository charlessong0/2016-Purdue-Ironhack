# 2016 Purdue Ironhack
## Introduction
This is a tutorial project for 2016 Purdue Ironhack. **Please notice that the example topic here is not the same as the one given to you!**

You may check it out as a reference for your own project. The Demo site for the project is here:
[http://test.rcodi.charlessong.me/](http://test.rcodi.charlessong.me/)

For more about Open Innovation and our Research Center of Open Digital Innovation at Purdue University:
[https://www.purdue.edu/opendigital/](https://www.purdue.edu/opendigital/)

By cloning this project and open the index.html file in your browser, start your journey in 2016 Purdue Ironhack right now! 

## Problem Statement
- **problem:** Individuals at Chicago are busy; professors, students, workers, advisors etc. and often making a good healthy meal and fast, while finding the different parts for that meal can be tricky. Make it simpler for people to make informed and healthy choices or to get the best food anywhere based on type.

- **problem statement:** Imagine a website application that would give you the grocery list, the cooking instructions, and much more with the click of a button based on your food preferences at that time. Create a website application with a mashup and help students, employees, and professors at Chicago to make that choice easier using local data and prices along with food health data to determine the best meal using the best and healthiest products. Be creative and think about how this best would help time-savvy individuals. Feel free to include whatever features YOU find relevant for the customer.

- **minimum requirements:**
  - You must submit a website application using insights you’ve collected from analyzing at least 2 open datasets.
  - Which datasets can be used (feel free to use others): MyPyramidFood Raw Data provides .xml files with what foods, portion amounts, and condiments that go with certain foods in the US. Combining this with farmer’s markets data, Internet Weather Source, and local data from e.g. stores (Meijer, Pay-Less, Walmart, Target, Aldi, Fresh Thyme etc.)
  - You are required to use JavaScript and GitHub for your submission.
  - Using JavaScript, please adhere to the rules of the W3 School: http://www.w3schools.com/js/js_best_practices.asp
  - You must provide access to and testing instructions for your submission

- **evaluation criteria:**
  - Customer requirements: keep individuals at Chicago healthy and have them optimize their food, increase local revenue for fruits and vegetables. Be innovative in solving this customer problem. We will apply objective measures to evaluate your application: 1) Accuracy of meal guidelines – we will have a panel of 30 users compare their accuracy of 5 random portion amounts from using the application with actual USDA and FDA guidelines, 2) Number of meal alternatives presented.
  - Technology and code: Create a repository and algorithm that combines different types of local and national data to make it simpler for people to make informed and healthy choices. E.g. a map with directions, prices, and a list of food/meal suggestions. Besides the functionality, we will assess your code. How will we assess the code? 1) Efficiency of code (expert evaluation as well as test with tool for code efficiency) 2) App processing time (real time) 3) Logic of code structure (expert evaluation – how well do they understand the code), 4) The App/mash-up availability is stable and reliable (rating by experts and user panel)User experience and evaluation measures: Besides functionality and technology, user experience also matters. We will assess based on the following criteria: 1) time for completing the task (click stream analysis), 2) Usability rating by our experts and user panel.

##Development Process##

**1. Explore the datasets that I am enforced to use**

Spend some time exploring what is the structure and how the datasets are organized in order to know the limits of the datasets.

The first dataset is Farmer’s market: 

[http://catalog.data.gov/dataset/farmers-markets-2015](http://catalog.data.gov/dataset/farmers-markets-2015)

This dataset is in different formats that will simplify my life later in the development. Taking a closer view to the dataset I observe that there are several columns with the following information about location, start and end time, website.

The second dataset is Weather data: 

[http://weather.noaa.gov/](http://weather.noaa.gov/)

A closer examination on this dataset tell us that it offers the following variables: temperature, humidity, pressure, wind, clouds, visibility, precipitation and weather.

**2. Explore other datasets that could be combined with the enforced datasets and libraries**

Once I got knowledge on what I can get from the datasets I’m supposed to used, I explore datasets from Data.Gov ([http://www.data.gov/](http://www.data.gov/)) considering the possibilities of using visualization libraries or APIs as Google maps. These are some useful visualization libraries:

[http://arborjs.org/](http://arborjs.org/) A graph visualization library 

[http://d3js.org/](http://d3js.org/) A library to create interactive graphs

[http://sigmajs.org/](http://sigmajs.org/) Another library to display graphs


**3. Identify the solution to be implemented and their associated keywords**
Considering the two datasets, additional datasets that I consider important in combination with some external libraries I target to do a solution to a problem.

Based on these specifications we thought that a solution that provides the position of the farmer’s, the current time to know if there is going to be a market or not (in case it is heavy rain, there is going to be no shops there). Moreover, we provide which farmer market is the best for the user based on fictitious that in a real solution should be derived from several datasets.
Keywords: Farmer market, Rating, Chicago, Real-time, Position

So, the solution is going to be something where on the left side a map with the location of the farmer’s market is going to be found, and a description of these farmer’s market is going to be displayed on the right side.


**4. Set up the GitHub**

Using the repository that we provide connect to Github and upload the readme file with the basic information (problem addressed, author, description of the solution, keywords datasets used, external libraries used)

We first modify the Readme with the basic information

Problem addressed: What’s for dinner in Chicago?
Author: Author Name (authorname@gmail.com)
Description of the solution: We provide real-time data about which farm market is the best place to buy today based on your position (IP based) and the main features of each farm market.
Keywords: Farmer market, Rating, Chicago, Real-time, Position

We initialize the directory where the solution is going to be

    > git init
    Add all the files in the repository
    > git add .
    Commit the files to the repository
    > git commit -m ‘Updated Readme description
    Add the repository to update (repository_URL)
    > git remote add origin remote repository_URL
    Set the new remote
    > git remote -v
    Push the changes to the GitHub repository
    > git push origin master


**5. Get familiar with external libraries and API**
Explore the documentation and some examples of external libraries to see how they should be implemented in the solution

**6. Integrate the datasets in the solution**
Display the data from the different datasets in the raw to check that you have no problem accessing them. In some cases, you are might to need to process them in others not. This will vary entirely depending on the dataset. Remember to keep pushing changes to the community.

The first step we needed was to show the raw data from the weather in this position

In this project we get weather data from [http://weather.noaa.gov/](http://weather.noaa.gov/) . As the data are formed in HTML page, you may want to get a request API for these data.


Try [https://developer.yahoo.com/yql/](https://developer.yahoo.com/yql/) , which is an online toolkit to pack public HTML pages into json APIs (use the endpoint as API). 


There is also another tool for you to structure your json response and read it online: [http://json.parser.online.fr/](http://json.parser.online.fr/) .

Use a xmlHttpRequest in your javascript to request that data.

```javascript
var xmlhttp = new XMLHttpRequest();
var url = "your api url";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
var myArr = xmlhttp.responseText;
var text = myArr;
}
};
```
We can find from the API description that this API will response in JSON. As some so-called “json” data is only json-formated text data, ßwe may want to convert your request result into json.
```javascript
var json = JSON.parse(text);
```
After we get the original json data, we may need to wash them for further usage. In this tutorial case, we just use them in hard code:
```javascript
    document.getElementById("weather").innerHTML = "Today the weather is " + json.weather[0].main + " ";
```
The second step we needed was to show the raw data from the location of each farm market

This would be the same as the first step. For this project, we find our data from [http://catalog.data.gov/dataset/farmers-markets-2015](http://catalog.data.gov/dataset/farmers-markets-2015), request for it and wash it.



The third step we needed was to show the raw data from the fake rating

After we get the markets data washed, we can develop some functions to analyze it and get scores for rating. In the tutorial case, we use Math.random method to fake rating scores. You should develop your own algorithm in this part:
```javascript
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
```


**7. Start implementing each item separately**
Start implementing each piece of the solution that requires an external library or API separately, so there are no dependencies problems.

Using the raw data from location, we personalize the google api to show the farmer markets  in the area (Google Map API)

As for the google map api, we should create map, marker, infoWindow as objects:
```javascript
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
```
Then we can add location data of different markets on the map:
```javascript
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
```
Using the raw data from each farm market we displayed in the radar chart (D3js)

As we fake the scores based on the market data, we could call function, which is developed based on D3js, to draw the radar chart at the front end.
```javascript
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
```

**8. Integrate them together**
Once all the items from your solution are running, the next step is integrate them together.

Once we had both items in place we add the logic to link them.

Add a listener for each mark on the map. When one is clicked, the javascript will track the click, get the id of that mark and reset the information panel using that id:
```javascript
google.maps.event.addListener(markers[key], 'click', function() {
    document.getElementById("market-name").innerHTML = washedData[key][2];
    document.getElementById("street-name").innerHTML = washedData[key][3];
```

**9. Structure and Best Practices**
Remember to have a proper file structure, as well as following the best practices from [http://www.w3schools.com/js/js_best_practices.asp](http://www.w3schools.com/js/js_best_practices.asp)

**10. Improve, Improve, Improve**
Once the solution is completed, try to asses it with the parameters that were given and improve it as much as you can. 

Good luck!


  
  



