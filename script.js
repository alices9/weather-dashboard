var searchEl = document.getElementById("search-btn");
var cityEl = document.getElementById("city-input");

var APIKey = "43dce1cbede3db860e66e5fee0faaf41";



function getApi(event) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityEl.value + "&units=imperial" + "&appid=" + APIKey;
    event.preventDefault();

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