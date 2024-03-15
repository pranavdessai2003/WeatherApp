const apikey = "7b48ca54adb754d5c1ed947d4178c331";

function fetchData(city) {
  event.preventDefault();
  fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+apikey)
    .then((response) => response.json())
    .then((response) => {
      cityname.innerHTML = response.name;
      citynamefordesc.innerHTML = response.name;
      inCity.innerHTML = response.name;
      wind_deg.innerHTML = response.wind.deg;
      speed.innerHTML = response.wind.speed;
      sunrise.innerHTML = convertUnixTime(response.sys.sunrise)
      sunset.innerHTML = convertUnixTime(response.sys.sunset)
      lat.innerHTML = response.coord.lat;
      lon.innerHTML = response.coord.lon;
      temp.innerHTML = truncateDecimals(kelvinToCelsius(response.main.temp), 2);
      feels_like.innerHTML = truncateDecimals(
        kelvinToCelsius(response.main.feels_like),
        2
      );
      humidity.innerHTML = response.main.humidity;
      pressure.innerHTML = response.main.pressure;
      maxtemp.innerHTML = truncateDecimals(
        kelvinToCelsius(response.main.temp_max),
        2
      );
      mintemp.innerHTML = truncateDecimals(
        kelvinToCelsius(response.main.temp_min),
        2
      );
      desc.innerHTML = response.weather[0].description;
      console.log(response);
    })
    .catch((err) => console.error(err));
}

truncateDecimals = function (number, digits) {
  var multiplier = Math.pow(10, digits),
    adjustedNum = number * multiplier,
    truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

  return truncatedNum / multiplier;
};
function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}


function convertUnixTime(timestamp){
  var date = new Date(timestamp * 1000);

  // Hours part from the timestamp
  var hours = date.getHours();

  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();

  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return  formattedTime;
}
