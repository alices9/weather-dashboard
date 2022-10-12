var searchEl = document.getElementById("search-btn");
var cityEl = document.getElementById("city-input");
var historyEl = document.getElementById("past-searches");
var currentCityEl = document.getElementById("current-city-name");
var currentIconEl = document.getElementById("current-icon");
var currentTempEl = document.getElementById("current-temp");
var currentWindEl = document.getElementById("current-wind");
var currentHumEl = document.getElementById("current-hum");
var forecastHeadingEl = document.getElementById("future-forecast");
var futureEl = document.getElementById("future-weather");

var APIKey = "43dce1cbede3db860e66e5fee0faaf41";


// getting today's weather
function todaysWeather () {
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityEl.value + "&units=imperial" + "&appid=" + APIKey;

    fetch(weatherURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        var imgSrc = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        currentCityEl.innerHTML = cityEl.value.toUpperCase() + " | " + moment().format("MMM Do, YYYY");
        currentIconEl.setAttribute("src", imgSrc);
        currentTempEl.innerHTML = "Temp: " + data.main.temp + "°F";
        currentWindEl.innerHTML = "Wind: " + data.wind.speed + "mph";
        currentHumEl.innerHTML = "Humidity: " + data.main.humidity + "%";
    }
      )  
}


// getting the 5 day forecast
function forecast() {
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityEl.value + "&units=imperial" + "&appid=" + APIKey;

    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data2) {
        forecastHeadingEl.innerHTML = "Five day forecast:"

        // clears previous info
        futureEl.innerHTML = "";
        // iterate through the data to get wanted info
        for (var i=6; i < data2.list.length; i += 8) {
          var newCard = document.createElement("div");
          newCard.setAttribute("class", "card col-2");
          var newImg = document.createElement("img");
          var imgSrc = "http://openweathermap.org/img/wn/" + data2.list[i].weather[0].icon + "@2x.png"
          var newTemp = document.createElement("p");
          var newWind = document.createElement("p");
          var newHum = document.createElement("p");
          newImg.setAttribute("src", imgSrc);
          newTemp.innerHTML = "Temp: " + data2.list[i].main.temp + "°F";
          newWind.innerHTML = "Wind: " + data2.list[i].wind.speed + "mph";
          newHum.innerHTML = "Humidity: " + data2.list[i].main.humidity + "%";
          newCard.appendChild(newImg);
          newCard.appendChild(newTemp);
          newCard.appendChild(newWind);
          newCard.appendChild(newHum);
          futureEl.appendChild(newCard);

          // creating the date headers
          if (i===6) {
            var newDate = document.createElement("h4");
            newDate.innerHTML = moment().add(1, 'day').format("MMM Do, YYYY"); 
            newCard.insertBefore(newDate, newTemp);
          } else if (i===14) {
            newDate = document.createElement("h4");
            newDate.innerHTML = moment().add(2, 'day').format("MMM Do, YYYY"); 
            newCard.insertBefore(newDate, newTemp);
          } else if (i===22) {
            newDate = document.createElement("h4");
            newDate.innerHTML = moment().add(3, 'day').format("MMM Do, YYYY"); 
            newCard.insertBefore(newDate, newTemp);
          } else if (i===30) {
            newDate = document.createElement("h4");
            newDate.innerHTML = moment().add(4, 'day').format("MMM Do, YYYY"); 
            newCard.insertBefore(newDate, newTemp);
          } else if (i===38) {
            newDate = document.createElement("h4");
            newDate.innerHTML = moment().add(5, 'day').format("MMM Do, YYYY"); 
            newCard.insertBefore(newDate, newTemp);
          }
        }
      }   
      )
}
// adds button
function searchHistory() {
  var histButton = document.createElement("button");
  histButton.innerHTML = cityEl.value;
  histButton.setAttribute("class", "btn btn-outline-success w-100");
  historyEl.appendChild(histButton);
}

// when the user clicks submit
function submit(event) {
  event.preventDefault();
  todaysWeather();
  forecast();
  searchHistory();
}

searchEl.addEventListener('click', submit);