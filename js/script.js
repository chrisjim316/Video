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

function sendText() {
  var text = $("#text").val();
  $("#chatOutput").append(text + "<br>");
  console.log(text);
  getRelevantInfo(text);
  getSuggestions(text);
}

/* send the text message when enter key is pressed. */
$("#text").keypress(function (e) {
  if (e.which == 13) {
    $("#send").click();
    return false; //prevent refreshing the page every time enter key is pressed. 
  }
});


function getRelevantInfo (text) {
  $.ajax({
    url: wikiAPI,
    data: { action: 'query', list: 'search', srsearch: text, srlimit: 1, format: 'json' }, //srsearch searches for the first result
    dataType: 'jsonp',
    /* generate html for the first search result */
    success: function (data) {
      var html = '';  
      data.query.search.map(function(res) {
        html += '<div class="well">';
        html += res.snippet;
        html += '</div>';
      });  
      $("#wiki").html(html);
    }
  });//end ajax function

}

function getSuggestions (text) {
  $.ajax({
    url: wikiAPI,
    data: { action: 'query', list: 'search', srsearch: text, format: 'json' }, //srsearch searches for all results associated with the keywords     
    dataType: 'jsonp',
    /* generate html for each search result (10 results by default) */
    success: function (data) {
      var html = '';
          html += '  <div class="row row-centered">';
      
      data.query.search.map(function(res) {
        html += '    <div class="col-md-6">';
        html += '      <a href="https://en.wikipedia.org/wiki/' + res.title + '" target="_blank">';
        html += '        <div class="panel panel-default" style="position:relative;">';
        html += '          <div class="panel-heading">';
        html += '            <h3 class="panel-title"><strong>' + res.title + '</strong></h3>';
        html += '          </div>';
        html += '          <div class="panel-body">';
        html += '            ' + res.snippet;
        html += '          </div>';
        html += '        </div>';
        html += '      </a>';
        html += '    </div>';
      });
      
      html += '  </div>';
      
      $("#suggestions").html(html);
    }
    });//end ajax function
}
