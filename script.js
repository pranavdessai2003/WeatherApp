import config from './config.js';
const apikey = config.apikey;

function fetchData(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
    .then((response) => {
      if (!response.ok) {
        const mainContent = document.querySelector('main')
        mainContent.style.display = 'none';
        
        const notFoundmsg = document.getElementsByClassName('not-found')
        notFoundmsg.style.display = 'block';
        throw new Error("City not found.");
      }
      return response.json();
    })
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
    .catch((err) => {
      document.querySelector('main').style.display = 'none';
      document.querySelector('.initial-mssg').style.display = 'none';
      document.querySelector('.not-found').style.display = 'block';
      console.error(err)
    });
}

function truncateDecimals(number, digits) {
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

  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();

  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return formattedTime;
}

document.querySelector('form').addEventListener('submit', (event) => {
  document.querySelector('main').style.display = 'block';
  document.querySelector('.initial-mssg').style.display = 'none';
  document.querySelector('.not-found').style.display = 'none';
  fetchData(inputcity.value);
  event.preventDefault(); // Prevent default form submission behavior
});

function showInitialMessage() {
  document.querySelector('main').style.display = 'none';
  document.querySelector('.initial-mssg').style.display = 'block';
  document.querySelector('.not-found').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', showInitialMessage);
