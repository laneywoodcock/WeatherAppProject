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
h5.innerHTML = `${day}, ${month} ${date} ${year} ${hour}:${minutes}:${seconds}`;

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
    h1.innerHTML = `${description}, in ${response.data.name}`;
    h2.innerHTML = `${temperature}°`;
}

//Submit Button

function searchWeather(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&&units=imperial`;
  axios.get(apiUrl).then(showWeather);
} 

let form = document.querySelector("form");
form.addEventListener("submit", searchWeather);


//Conversion Functions
//insert the equation to convert temperature values
function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#degrees");
    temperatureElement.innerHTML = 66;
  }
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#degrees");
    temperatureElement.innerHTML = 19;  
 }
 let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);





  

  

  

  
  