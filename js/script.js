var vidyoConnector;
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

  

   // Callback method when VidyoIO is done loading (pointer to this method is passed in the onload parameter while including the
   // VidyoClient.js file)
    function onVidyoClientLoaded(status) {
      console.log("VidyoClient load state - " + status.state);
      if (status.state == "READY") {
        VC.CreateVidyoConnector({
          viewId:"renderer", // Div ID where the composited video will be rendered, see VidyoConnector.html;
          viewStyle:"VIDYO_CONNECTORVIEWSTYLE_Default", // Visual style of the composited renderer
          remoteParticipants:10, // Maximum number of participants to render
          logFileFilter:"error",
          logFileName:"",
          userData:""
        }).then(function (vc) {
          console.log("Create success");
          vidyoConnector = vc;
        }).catch(function(error){

        });
      }
    }

    function joinCall(){
      // To join a video conference call Connect method
      vidyoConnector.Connect({
        host:"prod.vidyo.io",  // Server name, for most production apps it will be prod.vidyo.io
        token:"cHJvdmlzaW9uAHVzZXIxQGVkNjU4Ni52aWR5by5pbwA2MzY3NDEwMDg5NwAAZTUyODllZTRkMTYzNDhiYWQ0YTYwYzYzOTQ2ZWEyMDliYWRjZjkxODk3NzcxY2M0NzE3ODZlZjMzOTcyZTc4MTQwMTdkM2Q5ZGQ4YTNkYzRlODk4ZWU2YmY3MDk1MTc4",          // Add generated token (https://developer.vidyo.io/documentation/4-1-16-8/getting-started#Tokens)
        displayName:"Culturoo",  // Display name
        resourceId:"demoRoom", // Room name
        onSuccess: function(){
          console.log("Connected!! YAY!");
        },
        onFailure: function(reason){
          console.error("Connection failed");
        },
        onDisconnected: function(reason) {
          console.log(" disconnected - " + reason);
        }
      })
    }





