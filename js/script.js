var api = "https://fcc-weather-api.glitch.me/api/current?";

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
      $("#error").append("Unable to retrieve location. Change or update browser version");
      console.log("Geolocation is not supported for this browser.")
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

function sendText() {
  var text = $("#text").val();
  $("#chatOutput").append(text + "<br>");
}

  

   





