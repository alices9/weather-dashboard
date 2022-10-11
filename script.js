var searchEl = document.getElementById("search-btn");
var cityEl = document.getElementById("city-input");
var todaysWeatherEl = document.getElementById("current-city-name");
var currentTempEl = document.getElementById("current-temp");
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
        todaysWeatherEl.innerHTML = cityEl.value.toUpperCase() + " | " + moment().format("MMM Do, YYYY");
        currentTempEl.innerHTML = "Temp: " + data.main.temp;
        currentWindEl.innerHTML = "Wind: " + data.wind.speed;
        currentHumEl.innerHTML = "Humidity: " + data.main.humidity;
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