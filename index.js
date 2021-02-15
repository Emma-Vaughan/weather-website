console.log("hi");

function submit() {
  const location = document.getElementById("input").value;

  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      location +
      "&units=metric&appid=574957e404a82a0a45e00398ed8c590f"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const weatherText = data.weather[0].main;
      const temp = data.main.temp;

      document.querySelector(".weatherText").innerHTML = weatherText;
      document.querySelector(".temp").innerHTML = temp + " degrees celcius";
    });
}
