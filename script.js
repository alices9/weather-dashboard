var searchEl = document.getElementById("search-btn");
var cityEl = document.getElementById("city-input");
var todaysWeatherEl = document.getElementById("current-city-name");
var currentTempEl = document.getElementById("current-temp");
var currentWindEl = document.getElementById("current-wind");
var currentHumEl = document.getElementById("current-hum");
var futureEl = document.getElementById("future-weather");

var APIKey = "43dce1cbede3db860e66e5fee0faaf41";


// getting today's weather
function todaysWeather () {
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityEl.value + "&units=imperial" + "&appid=" + APIKey;
    // event.preventDefault();

    fetch(weatherURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        todaysWeatherEl.innerHTML = cityEl.value.toUpperCase() + " | " + moment().format("MMM Do, YYYY");
        currentTempEl.innerHTML = "Temp: " + data.main.temp;
        currentWindEl.innerHTML = "Wind: " + data.wind.speed;
        currentHumEl.innerHTML = "Humidity: " + data.main.humidity;
    }
      )  
}


// getting the 5 day forecast
function forecast() {
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityEl.value + "&units=imperial" + "&appid=" + APIKey;
    // event.preventDefault();

    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data2) {
        console.log(data2);
        // console.log(data2.list[6].main.temp);

        for (var i=6; i < data2.list.length; i += 8) {
          var newCard = document.createElement("div");
          var newDate = document.createElement("h4");
          var newTemp = document.createElement("p");
          var newWind = document.createElement("p");
          var newHum = document.createElement("p");
          newTemp.innerHTML = "Temp: " + data2.list[i].main.temp;
          newWind.innerHTML = "Wind: " + data2.list[i].wind.speed;
          newHum.innerHTML = "Humidity: " + data2.list[i].main.humidity;
          newCard.appendChild(newTemp);
          newCard.appendChild(newWind);
          newCard.appendChild(newHum);
          futureEl.appendChild(newCard);

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
            newDate.innerHTML = moment().add(2, 'day').format("MMM Do, YYYY"); 
            newCard.insertBefore(newDate, newTemp);
          }
        }
        // for (var j=1; j < 6; j++) {
        //   var newDate = document.createElement("h4");
        //   newDate.innerHTML = moment().add(j, 'day').format("MMM Do, YYYY"); 
        //   newCard.insertBefore(newDate, newTemp);
        // }
        
        // for (var i=6; i < data2.list.length; i += 8) {
        //   var newCard = document.createElement("div");
        //   var newDate = document.createElement("h4");
        //   var newTemp = document.createElement("p");
        //   var newWind = document.createElement("p");
        //   var newHum = document.createElement("p");
        //   newDate.innerHTML = moment().add(1, 'days'); 
        //   newTemp.innerHTML = "Temp: " + data2.list[i].main.temp;
        //   newWind.innerHTML = "Wind: " + data2.list[i].wind.speed;
        //   newHum.innerHTML = "Humidity: " + data2.list[i].main.humidity;
        //   newCard.appendChild(newDate);
        //   newCard.appendChild(newTemp);
        //   newCard.appendChild(newWind);
        //   newCard.appendChild(newHum);
        //   futureEl.appendChild(newCard);
        // }
      }
    
      )

}

function submit(event) {
  event.preventDefault();
  todaysWeather();
  forecast();
}

searchEl.addEventListener('click', submit);