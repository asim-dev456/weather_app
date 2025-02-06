const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const API_KEY = '404be48fedbb00b5f2eac5bdc254b9f6'; // Replace with your OpenWeather API Key

app.get('/', async (req, res) => {
  const city = req.query.city || 'Lahore'; // Default city if none is provided
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(API_URL);
    const weatherData = response.data;

    res.render('index', {
      weather: {
        city: weatherData.name,
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
      },
      error: null,
    });
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.render('index', {
      weather: null,
      error: 'City not found. Please try again!',
    });
  }
});

app.listen(3000, () => console.log('Server running on PORT 3000'));
