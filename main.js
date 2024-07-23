const container = document.querySelector('.container1');
const search = document.querySelector('.searchbox button');
const whetherBox = document.querySelector('.whether-box');
const whetherDetails = document.querySelector('.whether-details');

search.addEventListener('click', () => {
    const APIKEY = '98740f4ebc0d63bc0f8ba70090e5a091';
    const city = document.querySelector('.searchbox input').value.trim();

    if (city === '') {
        console.error('City input is empty');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(json => {
            console.log('Weather data:', json);  // Log the data received
            const image = document.querySelector('.whether-box img');
            const temperature = document.querySelector('.whether-box .temperature');
            const description = document.querySelector('.whether-box .description');
            const humidity = document.querySelector('.whether-details .humaity span');
            const wind = document.querySelector('.whether-details .wind span');

            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${Math.round(json.wind.speed)}km/h`;

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;
                case 'Rain':
                    image.src = 'rain1.png';
                    break;
                case 'Snow':
                    image.src = 'snow.png';
                    break;
                case 'Clouds':  // Use 'Clouds' instead of 'Cloud' as per OpenWeatherMap API
                    image.src = 'cloud.png';
                    break;
                case 'Mist':
                    image.src = 'mist.png';
                    break;
                default:
                    image.src = 'cloud.png';
                    break;
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
});
