# 🌦️ Weather App - Assignment 3

A simple JavaScript weather application that displays the current weather and a 9-day forecast for any city using:

- 📍 [OpenStreetMap Nominatim API](https://nominatim.openstreetmap.org/) — for city geolocation
- 🌤️ [Met.no Location Forecast API](https://api.met.no/weatherapi/locationforecast/2.0/) — for weather data

---

## 🚀 Features

- Search for any city to get real-time weather
- Displays:
  - Temperature
  - Wind speed
  - Humidity
  - Air pressure
  - Cloud cover
  - Wind direction
- 9-day weather forecast (at noon)
- Weather condition icons
- Clean, responsive UI
- Error handling for invalid input or failed API responses

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Fetch API
- Open APIs:
  - Nominatim (OpenStreetMap)
  - Met.no (Norwegian Meteorological Institute)

---

## 📁 Project Structure

weather-app/

├── index.html # Main web page

├── style.css # Styling for the UI

└── app.js # JavaScript to handle logic and API calls

---

## ⚙️ How to Run Locally

git clone https://github.com/LuayALTAANI/Assignment-3.git

cd Assignment-3

Open the index.html file in your browser:

🧠 How It Works
User inputs a city name.

The app fetches coordinates using OpenStreetMap (Nominatim).

The coordinates are used to call the Met.no API for weather data.
