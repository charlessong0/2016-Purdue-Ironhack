/**
This is the tutorial project for 2015-fall Purdue Ironhack, which is organized by Reserach Center of Open Digital Innovation(RCODI) at Purdue University. 
If you want to know more about the Ironhack or about the RCODI, please find our website here: https://www.purdue.edu/opendigital/
You can checkout the code for this project on github: https://github.com/charlessong0/2015-Purdue-Ironhack
The demo page of this project is located at: http://test.rcodi.charlessong.me/

JSON read template
**/


//create a new httprequest for this session
var xmlhttp = new XMLHttpRequest();
//json format data resource url 
var url = "your api url";
xmlhttp.open("GET", url, true);
xmlhttp.send();

//once the request is accepted, process the fowllowing function to get data and complete the app information
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = xmlhttp.responseText;
        var text = myArr;
        alert(JSON.parse(text).data[1][1]);
        //document.getElementById("id01").innerHTML = myArr;


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




