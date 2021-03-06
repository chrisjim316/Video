/* get local weather api */
var api = "https://fcc-weather-api.glitch.me/api/current?";
/* get wikipedia api */
var wikiAPI = "//en.wikipedia.org/w/api.php";

$(document).ready( function() {
  
  /* get the user's consent to use his/her location */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = "lat=" + position.coords.latitude;
        var long = "lon=" + position.coords.longitude;
        var urlString = api + lat + '&' + long;
        getWeather(urlString);
        getLocation();
      });
    } else {
      console.log("Geolocation is not supported for this browser.");
    }
  
});

function getLocation() {
      $.ajax({
        url: "https://ipinfo.io/", dataType: "json", success: function (result) {
          $("#location").append(result.city + " " + result.country); 
        }  
      });
}

function getWeather(urlString) {
  $.ajax({
    url: urlString,  dataType: "json", success: function (result) {
      var temp = result.main.temp.toFixed(1);
      $("#temp").append(temp);
      $("#tempUnit").append(String.fromCharCode(176) + "C");
      $("#description").append(result.weather[0].main + " ");
      var weatherCondition = result.weather[0].main;
    }
  });
}

$("#toggleVideo").on("click", function () {
  if($("#renderer").style.display == 'none') {
    $("#renderer").style.display == '';
  } else {
    $("#renderer").style.display == 'none';
  }
});

/* send the text message when enter key is pressed. */
$("#text").keypress(function (e) {
  if (e.which == 13) {
    $("#send").click();
    return false; //prevent refreshing the page every time enter key is pressed. 
  }
});
