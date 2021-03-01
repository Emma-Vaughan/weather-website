let location1;
let temp;
let metric = "metric";
let imperial = "imperial";
let units = metric;

function fahrenheitFunc(data) {
  let tempType1 = units === metric ? "celcius" : "fahrenheit";
  let tempType2 = units === imperial ? "celcius" : "fahrenheit";

  temp = data.main.temp;
  document.querySelector(".temp").innerHTML = temp + " degrees " + tempType1;
  document.getElementById("switchText").innerHTML =
    "Switch temp to " + tempType2;
}

document.getElementById("input").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    document.getElementById("btn").click();
  }
});

function submit() {
  location1 = document.getElementById("input").value;
  document.getElementById("alertText").style.display = "none";

  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      location1 +
      "&" +
      "units=" +
      units +
      "&appid=574957e404a82a0a45e00398ed8c590f"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.cod === "404") {
        document.getElementById("alertText").style.display = "inherit";
        document.querySelector(".result").style.display = "none";
        document.querySelector(".searchAgain").style.marginTop = "3em";
        document.getElementById("input").value = "";
      }

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
      } else if (
        weatherText.toLowerCase().includes("haze") ||
        weatherText.toLowerCase().includes("fog")
      ) {
        document.getElementById("changeIcon").innerHTML =
          "<i class='fas fa-smog fa-5x'></i>";
      }

      if (
        weatherText.toLowerCase().includes("sun") ||
        weatherText.toLowerCase().includes("clear")
      ) {
        document.body.style.background = "linear-gradient(#fffd79, #ffd175)";
        document.querySelector("#toggle").classList.add("toggleColor");
      } else {
        document.body.style.background = "linear-gradient(#ffffff, #000080)";
        document.querySelector("#toggle").classList.remove("toggleColor");
      }

      document.getElementById("switch").style.visibility = "visible";
      document.querySelector(".top").style.display = "none";
      document.querySelector(".result").style.display = "inherit";
      document.querySelector(".searchAgain").style.display = "inherit";
      document.querySelector(".searchAgain").style.fontSize = "2em";
    });
}

function changeTemp() {
  units = units === metric ? imperial : metric;

  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      location1 +
      "&" +
      "units=" +
      units +
      "&appid=574957e404a82a0a45e00398ed8c590f"
  )
    .then((response) => response.json())
    .then(fahrenheitFunc);
}

function searchAgain() {
  document.querySelector(".top").style.display = "";
  document.querySelector(".result").style.display = "none";
  document.querySelector(".searchAgain").style.display = "none";
  document.querySelector("#alertText").style.display = "none";
}
