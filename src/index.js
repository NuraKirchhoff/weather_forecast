//enter submit
document
  .getElementById("city-form")
  .addEventListener(`keyup keydown`, function (event) {
    if (event.code === "Enter") {
      event.preventDefault();
      document.querySelector("form").submit();
    }
  });

//date
function date(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hours = now.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${days[now.getDay()]} ${hours}:${minutes}`;
}
let now = new Date();
let currentDate = document.querySelector("h2");
currentDate.innerHTML = date(now);

// get weather info
function showTemperature(response) {
  //city
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = response.data.name;

  //temperature
  let temperature = Math.round(response.data.main.temp);
  let tempDegree = document.querySelector("#degree-numb");
  tempDegree.innerHTML = `${temperature}`;

  //humidity
  let humidity = Math.round(response.data.main.humidity);
  let humiditySelect = document.querySelector("#humidity");
  humiditySelect.innerHTML = ` ${humidity}%`;

  //wind
  let windSpeed = Math.round(response.data.wind.speed);
  let windSelect = document.querySelector("#wind");
  windSelect.innerHTML = ` ${windSpeed} km/h`;

  //clearity
  let clearity = response.data.weather[0].main;
  let clearitySelect = document.querySelector("#clearity");
  clearitySelect.innerHTML = clearity;
}

//display city
function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-form");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${input.value}`;

  let apiKey = "7484e80630313a40c6d275fe9ae8e684";
  let units = "metric";
  let city = h1.innerHTML;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

// location
function curPosition(position) {
  let apiKey = "7484e80630313a40c6d275fe9ae8e684";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(curPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", getLocation);
