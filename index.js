let location1;
let temp;
let metric = "metric";
let imperial = "imperial";
let units = metric;

function callWeather(location1, callbackFunction) {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      location1 +
      "&" +
      "units=" +
      units +
      "&appid=574957e404a82a0a45e00398ed8c590f"
  )
    .then((response) => response.json())
    .then(callbackFunction);
}

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

function clearInput() {
  document.getElementById("input").value = "";
}

function mainSubmit(data) {
  if (data.cod === "404") {
    document.querySelector("#alertText").classList.remove("hidden");
    document.querySelector(".result").classList.add("hidden");
    document.querySelector(".searchAgain").style.marginTop = "3em";
    clearInput();
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
  clearInput();

  const weatherTextMethod = weatherText.toLowerCase();

  if (weatherTextMethod.includes("cloud")) {
    document.getElementById("changeIcon").innerHTML =
      "<i class='fas fa-cloud fa-5x'></i>";
  } else if (
    weatherTextMethod.includes("thunder") ||
    weatherTextMethod.includes("lightning")
  ) {
    document.getElementById("changeIcon").innerHTML =
      "<i class='fas fa-bolt fa-5x'></i>";
  } else if (
    weatherTextMethod.includes("sun") ||
    weatherTextMethod.includes("clear")
  ) {
    document.getElementById("changeIcon").innerHTML =
      "<i class='fas fa-sun fa-5x'></i>";
  } else if (
    weatherTextMethod.includes("rain") ||
    weatherTextMethod.includes("drizzle")
  ) {
    document.getElementById("changeIcon").innerHTML =
      "<i class='fas fa-umbrella fa-5x'></i>";
  } else if (weatherTextMethod.includes("snow")) {
    document.getElementById("changeIcon").innerHTML =
      "<i class='fas fa-snowflake fa-5x'></i>";
  } else if (
    weatherTextMethod.includes("haze") ||
    weatherTextMethod.includes("fog") ||
    weatherTextMethod.includes("mist")
  ) {
    document.getElementById("changeIcon").innerHTML =
      "<i class='fas fa-smog fa-5x'></i>";
  }

  if (
    weatherTextMethod.includes("sun") ||
    weatherTextMethod.includes("clear")
  ) {
    document.body.style.background = "linear-gradient(#fffd79, #ffd175)";
    document.querySelector("#toggle").classList.add("toggleColor");
  } else {
    document.body.style.background = "linear-gradient(#ffffff, #000080)";
    document.querySelector("#toggle").classList.remove("toggleColor");
  }

  document.getElementById("switch").style.visibility = "visible";
  document.querySelector(".top").classList.add("hidden");
  document.querySelector(".result").classList.remove("hidden");
  document.querySelector(".searchAgain").style.display = "inherit";
  document.querySelector(".searchAgain").style.fontSize = "2em";
}

function submit() {
  location1 = document.getElementById("input").value;
  document.querySelector("#alertText").classList.add("hidden");
  callWeather(location1, mainSubmit);
}

function changeTemp() {
  units = units === metric ? imperial : metric;
  callWeather(location1, fahrenheitFunc);
}

function searchAgain() {
  document.querySelector(".top").classList.remove("hidden");
  document.querySelector(".result").classList.add("hidden");
  document.querySelector(".searchAgain").style.display = "none";
  document.querySelector("#alertText").classList.add("hidden");
}
