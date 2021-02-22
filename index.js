let location1;
let temp;
let metric = "units=metric";
let imperial = "units=imperial";
let units = metric;

document.getElementById("input").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    document.getElementById("btn").click();
  }
});

function submit() {
  location1 = document.getElementById("input").value;

  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      location1 +
      "&" +
      units +
      "&appid=574957e404a82a0a45e00398ed8c590f"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      document.querySelector("h1").style.fontSize = "2em";

      const weatherText = data.weather[0].main;
      temp = data.main.temp;
      const city = data.name;

      document.querySelector(".weatherText").innerHTML = weatherText;
      const degreesText =
        units === metric ? " degrees celcius" : " degrees fahrenheit";
      document.querySelector(".temp").innerHTML = temp + degreesText;
      document.getElementById("cityName").innerHTML = city;
      document.getElementById("input").value = "";

      if (weatherText.toLowerCase().includes("cloud")) {
        document.getElementById("changeIcon").innerHTML =
          "<i class='fas fa-cloud fa-5x'></i>";
      } else if (
        weatherText.toLowerCase().includes("thunder") ||
        weatherText.toLowerCase().includes("lightning")
      ) {
        document.getElementById("changeIcon").innerHTML =
          "<i class='fas fa-bolt fa-5x'></i>";
      } else if (
        weatherText.toLowerCase().includes("sun") ||
        weatherText.toLowerCase().includes("clear")
      ) {
        document.getElementById("changeIcon").innerHTML =
          "<i class='fas fa-sun fa-5x'></i>";
      } else if (
        weatherText.toLowerCase().includes("rain") ||
        weatherText.toLowerCase().includes("drizzle")
      ) {
        document.getElementById("changeIcon").innerHTML =
          "<i class='fas fa-umbrella fa-5x'></i>";
      } else if (weatherText.toLowerCase().includes("snow")) {
        document.getElementById("changeIcon").innerHTML =
          "<i class='fas fa-snowflake fa-5x'></i>";
      }

      if (
        weatherText.toLowerCase().includes("sun") ||
        weatherText.toLowerCase().includes("clear")
      ) {
        document.body.style.background = "linear-gradient(#fffd79, #ffd175)";
      } else {
        document.body.style.background = "linear-gradient(#ffffff, #000080)";
      }

      document.getElementById("switch").style.visibility = "visible";
    });
}

function changeTemp() {
  let tempText = document.getElementById("switchText").innerHTML;

  if (tempText.toLowerCase().includes("fahrenheit")) {
    units = imperial;
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        location1 +
        "&" +
        units +
        "&appid=574957e404a82a0a45e00398ed8c590f"
    )
      .then((response) => response.json())
      .then((data) => {
        temp = data.main.temp;
        document.querySelector(".temp").innerHTML =
          temp + " degrees fahrenheit";
        document.getElementById("switchText").innerHTML =
          "Switch temp to celcius";
      });
  } else {
    units = metric;
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        location1 +
        "&" +
        units +
        "&appid=574957e404a82a0a45e00398ed8c590f"
    )
      .then((response) => response.json())
      .then((data) => {
        temp = data.main.temp;
        document.querySelector(".temp").innerHTML = temp + " degrees celcius";
        document.getElementById("switchText").innerHTML =
          "Switch temp to fahrenheit";
      });
  }
}
