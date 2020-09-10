//Time
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();

let h5 = document.querySelector("h5");
h5.innerHTML = `${day}, ${month} ${date}, ${year} ${hour}:${minutes}`;

function formatDate(date) {
  console.log(date.getDate());
}
formatDate(new Date());

////////GEOLOCATION 
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
function handlePosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
  
  function retrievePosition(position) {
    
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }  
  navigator.geolocation.getCurrentPosition(retrievePosition);

//Initial h1 Display (local weather)
function showWeather(response) {
  
    let h1 = document.querySelector("#display-temperature");
    let h2 = document.querySelector("#degrees");
    let temperature = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let icon = document.querySelector("#icon");
    fahrenheitTemperature = (response.data.main.temp);
    
    h1.innerHTML = `${description}, in ${response.data.name}`;
    h2.innerHTML = `${temperature}°F`;
    humidity.innerHTML = `${response.data.main.humidity}% Humidity`;
    wind.innerHTML = Math.round(response.data.wind.speed);
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${response.data.name}&appid=${apiKey}&&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

//Submit Button
function searchWeather(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&&units=imperial`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=${apiKey}&&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
} 

let form = document.querySelector("form");
form.addEventListener("submit", searchWeather);

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = null; 
  forecastElement.innerHTML = null;
 
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3> 
      ${formatHours(forecast.dt * 1000)} 
      </h3>
      <img 
        src="https://openweathermap.org/img/wn/${
          forecast.weather[0].icon
              }@2x.png" 
        id="icon"
        width=50px
        >
      <div class="weather-forecast-temperature">
       <strong>
      ${Math.round(forecast.main.temp_max)}°
       </strong>
       / ${Math.round(forecast.main.temp_min)}°
     </div>   
    </div>
`;
  }
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}


function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
  
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let fahrenheitTemperature = null;

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#degrees");
  let celsiusTemperature = (fahrenheitTemperature -32) * 5 / 9;
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);