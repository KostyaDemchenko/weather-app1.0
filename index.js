window.addEventListener("load", showUserCity);

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "25c29314e06b2092eeea53a7f82e95ef";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const feels = document.querySelector(".weather-box .feels");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      const currentTime = new Date(); // get the current time
      const currentHour = currentTime.getHours(); // get the current hour

      let weatherImage;

      if (currentHour >= 6 && currentHour <= 18) {
        // if it's daytime, use the appropriate weather image
        switch (json.weather[0].main) {
          case "Clear":
            weatherImage = "./images/clear.svg";
            break;
          case "Rain":
            weatherImage = "./images/rain.svg";
            break;
          case "Snow":
            weatherImage = "./images/snow.svg";
            break;
          case "Clouds":
            weatherImage = "./images/clouds.svg";
            break;
          case "Haze":
            weatherImage = "./images/mist.svg";
            break;
          default:
            weatherImage = "";
        }
      } else {
        // if it's nighttime, use the appropriate night weather image
        switch (json.weather[0].main) {
          case "Clear":
            weatherImage = "./images/clear-night.svg";
            break;
          case "Rain":
            weatherImage = "./images/rain-night.svg";
            break;
          case "Snow":
            weatherImage = "./images/snow-night.svg";
            break;
          case "Clouds":
            weatherImage = "./images/clouds-night.svg";
            break;
          case "Haze":
            weatherImage = "./images/mist-night.svg";
            break;
          default:
            weatherImage = "";
        }
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      feels.innerHTML = `Feels: ${json.main.feels_like}<span>°C</span>`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});

function showUserCity() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        // Отправляем запрос на получение погоды за геопозицией пользователя
        const APIKey = "25c29314e06b2092eeea53a7f82e95ef";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${APIKey}`;
        fetch(url)
          .then((response) => response.json())
          .then((json) => {
            // Обновляем интерфейс в соответствии с полученными данными
            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(
              ".weather-box .temperature"
            );
            const description = document.querySelector(
              ".weather-box .description"
            );
            const feels = document.querySelector(".weather-box .feels");
            const humidity = document.querySelector(
              ".weather-details .humidity span"
            );
            const wind = document.querySelector(".weather-details .wind span");

            const currentTime = new Date(); // get the current time
            const currentHour = currentTime.getHours(); // get the current hour

            let weatherImage;

            if (currentHour >= 6 && currentHour <= 18) {
              // if it's daytime, use the appropriate weather image
              switch (json.weather[0].main) {
                case "Clear":
                  weatherImage = "images/clear.svg";
                  break;
                case "Rain":
                  weatherImage = "images/rain.svg";
                  break;
                case "Snow":
                  weatherImage = "images/snow.svg";
                  break;
                case "Clouds":
                  weatherImage = "images/clouds.svg";
                  break;
                case "Haze":
                  weatherImage = "images/mist.svg";
                  break;
                default:
                  weatherImage = "";
              }
            } else {
              // if it's nighttime, use the appropriate night weather image
              switch (json.weather[0].main) {
                case "Clear":
                  weatherImage = "images/clear-night.svg";
                  break;
                case "Rain":
                  weatherImage = "images/rain-night.svg";
                  break;
                case "Snow":
                  weatherImage = "images/snow-night.svg";
                  break;
                case "Clouds":
                  weatherImage = "images/clouds-night.svg";
                  break;
                case "Haze":
                  weatherImage = "images/mist-night.svg";
                  break;
                default:
                  weatherImage = "";
              }
            }

            // Update the weather image
            if (weatherImage) {
              image.src = weatherImage;
            }

            temperature.innerHTML = `${parseInt(
              json.main.temp
            )}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            feels.innerHTML = `Feels: ${json.main.feels_like}<span>°C</span>`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // Check if these variables are defined
            const weatherBox = document.querySelector(".weather-box");
            const weatherDetails = document.querySelector(".weather-details");
            const container = document.querySelector(".container");

            if (weatherBox && weatherDetails && container) {
              weatherBox.style.display = "";
              weatherDetails.style.display = "";
              weatherBox.classList.add("fadeIn");
              weatherDetails.classList.add("fadeIn");
              container.style.height = "590px";
            } else {
              console.log("Ошибка получения элементов интерфейса");
            }
          })
          .catch((error) => {
            console.log("Ошибка получения данных: ", error);
          });
      },
      function (error) {
        console.log("Ошибка получения геолокации: ", error);
      }
    );
  }
}
