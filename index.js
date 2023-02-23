// querySelector`s
const container = document.querySelector('.container');
const weatherBox = document.querySelector('.weather-box');
const search = document.querySelector('.search-box button');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const feels = document.querySelector('.weather-box .feels');
const timeElement = document.querySelector('.weather-box .time');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');


// key bind 'enter -> search'
document.querySelector('.search-box input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    search.click();
  }
});

// Func for defolt images
function weatherCases(hour, main) {
  if (hour >= 6 && hour <= 18) {
    switch (main) {
      case 'Clear':
        return './images/clear.svg';
      case 'Rain':
        return './images/rain.svg';
      case 'Snow':
        return './images/snow.svg';
      case 'Haze':
      case 'Dust':
      case 'Fog':
      case 'Tornado':
        return './images/mist.svg';
      case 'Drizzle':
        return './images/drizzle.svg';
      case 'Thunderstorm':
        return './images/thunderstorm.svg';
      default:
        return '';
    }
  } else {
    switch (main) {
      case 'Clear':
        return './images/clear-night.svg';
      case 'Rain':
        return './images/rain-night.svg';
      case 'Snow':
        return './images/snow-night.svg';
      case 'Haze':
        return './images/mist-night.svg';
      case 'Dust':
        return './images/mist-night.svg';
      case 'Fog':
        return './images/mist-night.svg';
      case 'Tornado':
        return './images/mist-night.svg';
      case 'Drizzle':
        return './images/drizzle-night.svg';
      case 'Thunderstorm':
        return './images/thunderstorm-night.svg';
      default:
        return '';
    }
  }
}

// Search by the user location
window.addEventListener('load', () => {
  const locationInput = document.querySelector('.search-box input');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=25c29314e06b2092eeea53a7f82e95ef`)
          .then((response) => response.json())
          .then((json) => {

            // showing user location
            const city = json.sys.country;
            locationInput.value = city;

            // weather info box
            if (weatherBox && weatherDetails && container) {
              // user time
              const currentTime = new Date();
              const currentHour = currentTime.getHours();

              // case for clouds
              let weatherImage;
              if (currentHour >= 6 && currentHour <= 18) {
                switch (json.weather[0].description) {
                  case 'few clouds':
                  case 'scattered clouds':
                    weatherImage = './images/clouds.svg';
                    break;
                  case 'broken clouds':
                  case 'overcast clouds':
                    weatherImage = './images/overcast-clouds.svg';
                    break;
                  default:
                    weatherImage = weatherCases(currentHour, json.weather[0].main);
                }
              }
              else {
                switch (json.weather[0].description) {
                  case 'few clouds':
                  case 'scattered clouds':
                    weatherImage = './images/clouds-night.svg';
                    break;
                  case 'broken clouds':
                  case 'overcast clouds':
                    weatherImage = './images/overcast-clouds-night.svg';
                    break;
                  default:
                    weatherImage = weatherCases(currentHour, json.weather[0].main);
                }
              }

              // Update the weather image
              if (weatherImage) {
                image.src = weatherImage;
              }

              // HTML output
              temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
              description.innerHTML = `${json.weather[0].description}`;
              feels.innerHTML = `Feels: ${Math.floor(json.main.feels_like)}<span>°C</span>`;
              humidity.innerHTML = `${json.main.humidity}%`;
              wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
              weatherBox.style.display = '';
              weatherDetails.style.display = '';
              weatherBox.classList.add('fadeIn');
              weatherDetails.classList.add('fadeIn');
              container.style.height = '640px';
            } else {
              console.log('Ошибка получения элементов интерфейса');
            }
          })
          .catch((error) => console.log('Ошибка получения данных: ', error));
      },
      (error) => console.log('Ошибка получения геолокации: ', error)
    );
  }
});

// Search from input
search.addEventListener('click', () => {
  const APIKey = '25c29314e06b2092eeea53a7f82e95ef';
  const city = document.querySelector('.search-box input').value;
  if (city === '') return;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then((response) => response.json())
    .then((json) => {

      // invalid input
      if (json.cod === '404') {
        Object.assign(container.style, { height: '500px' });
        Object.assign(weatherBox.style, { display: 'none' });
        Object.assign(weatherDetails.style, { display: 'none' });
        Object.assign(error404.style, { display: 'block' });
        error404.classList.add('fadeIn');
        return;
      }
      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      // time in this location
      const timeZoneOffsetSeconds = json.timezone - 7200;
      const timeZoneOffsetMilliseconds = timeZoneOffsetSeconds * 1000;
      const cityDate = new Date(Date.now() + timeZoneOffsetMilliseconds);

      const options = { hour12: false, hourCycle: 'h23' };
      const timeString = cityDate.toLocaleTimeString(undefined, options);

      // output pic from time zone
      const currentHour = cityDate.getHours();

      // output time in html
      const hoursAndMinutes = timeString.slice(0, 5);
      timeElement.textContent = hoursAndMinutes;

      // case for clouds
      let weatherImage;
      if (currentHour >= 6 && currentHour <= 18) {
        switch (json.weather[0].description) {
          case 'few clouds':
          case 'scattered clouds':
            weatherImage = './images/clouds.svg';
            break;
          case 'broken clouds':
          case 'overcast clouds':
            weatherImage = './images/overcast-clouds.svg';
            break;
          default:
            weatherImage = weatherCases(currentHour, json.weather[0].main);
        }
      }
      else {
        switch (json.weather[0].description) {
          case 'few clouds':
          case 'scattered clouds':
            weatherImage = './images/clouds-night.svg';
            break;
          case 'broken clouds':
          case 'overcast clouds':
            weatherImage = './images/overcast-clouds-night.svg';
            break;
          default:
            weatherImage = weatherCases(currentHour, json.weather[0].main);
        }
      }

      // Update the weather image
      if (weatherImage) {
        image.src = weatherImage;
      }

      // HTML output
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      feels.innerHTML = `Feels: ${Math.floor(json.main.feels_like)}<span>°C</span>`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
      if (weatherBox && weatherDetails && container) {
        Object.assign(weatherBox.style, { display: '' });
        Object.assign(weatherDetails.style, { display: '' });
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        Object.assign(container.style, { height: '640px' });
      } else {
        console.log('Ошибка получения элементов интерфейса');
      }
    })
    .catch((error) => {
      console.log('Ошибка получения данных: ', error);
    });
});
