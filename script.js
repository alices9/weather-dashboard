var searchEl = document.getElementById("search-btn");
var cityEl = document.getElementById("city-input");
var todaysWeatherEl = document.getElementById("current-city-weather");
var currentTempEl = document.getElementById("current-temperature");
var currentWindEl = document.getElementById("current-wind");
var currentHumEl = document.getElementById("current-hum");

var APIKey = "43dce1cbede3db860e66e5fee0faaf41";


// getting today's weather
function todaysWeather (event) {
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityEl.value + "&units=imperial" + "&appid=" + APIKey;
    event.preventDefault();

    fetch(weatherURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        currentTempEl.innerHTML = data.main.temp;
    }
      )  
}

searchEl.addEventListener('click', todaysWeather);


// getting the 5 day forecast
function getApi(event) {
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityEl.value + "&units=imperial" + "&appid=" + APIKey;
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

// searchEl.addEventListener('click', getApi);