var searchEl = document.getElementById("search-btn");
var cityEl = document.getElementById("city-name");

var APIKey = "43dce1cbede3db860e66e5fee0faaf41";



function getApi() {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityEl.value() + "&appid=" + APIKey;

    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
    }
      )

}

searchEl.addEventListener('click', getApi);