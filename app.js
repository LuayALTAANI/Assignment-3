
const cityInput = document.getElementById("cityInput")
const alertMsg = document.getElementById("alertMsg");
const weatherContainer = document.getElementById("weather");
const currentWeather = document.getElementById("currentWeather");
const getWeatherBtn = document.getElementById("getWeatherBtn");

// GeoData class holds latitude, longitude, and display name of the city
class GeoData {
    constructor(lat, lon, displayName) {
        this.lat = lat;
        this.lon = lon;
        this.displayName = displayName;
    }
}
// WeatherData class holds date, temperature, wind speed, and weather symbol
class WeatherData {
    constructor(date, temperature, wind, symbol) {
        this.date = date;
        this.temperature = temperature;
        this.wind = wind;
        this.symbol = symbol;
    }
}

// Event listener for the button to fetch weather data
getWeatherBtn.addEventListener("click", getWeather);

// Function to fetch weather data based on the city input
async function getWeather() {
    const city = cityInput.value.trim();
    weatherContainer.innerHTML = "";
    alertMsg.textContent = "";

    if (!city) {
        alertMsg.textContent = "Please enter a city name.";
        return;
    }

    try {
        const geoUrl = `https://nominatim.openstreetmap.org/search?q=${city.replace(" ", '_')}&format=json&limit=1`;
        const geoRes = await fetch(geoUrl);
        const jsonData = await geoRes.json();

        if (jsonData.length === 0) {
            alertMsg.textContent = "City not found.";
            return;
        }
        const geoData = new GeoData(jsonData[0].lat, jsonData[0].lon, jsonData[0].display_name);

        const weatherUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${geoData.lat}&lon=${geoData.lon}`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();
        alertMsg.textContent = geoData.displayName;

        const timeseries = weatherData.properties.timeseries;
        const currentWeatherData = timeseries[0];
        const dailyData = [];

        for (let i = 0; i < timeseries.length; i++) {
            const time = timeseries[i].time;
            const date = time.split("T")[0];
            if (time.includes("12:00:00Z")) {
                const details = timeseries[i].data.instant.details;
                const symbol = timeseries[i].data.next_1_hours?.summary?.symbol_code || "clearsky_day";

                dailyData.push(new WeatherData(date, details.air_temperature, details.wind_speed, symbol));
            }
        }

        dailyData.forEach(day => {
            const card = document.createElement("div");
            const dateC = document.createElement("div");
            const imgC = document.createElement("img");
            const tempC = document.createElement("div");
            const windC = document.createElement("div");

            card.className = "day";
            dateC.className = "date";
            tempC.className = "temp";

            dateC.textContent = day.date;
            imgC.src = `https://api.met.no/images/weathericons/png/${day.symbol}.png`;
            imgC.alt = day.symbol;
            tempC.textContent = `${day.temperature}°C`;
            windC.textContent = `Wind: ${day.wind} m/s`;

            card.appendChild(dateC);
            card.appendChild(imgC);
            card.appendChild(tempC);
            card.appendChild(windC);
            weatherContainer.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        alertMsg.textContent = "Error fetching weather data.";
    }
}