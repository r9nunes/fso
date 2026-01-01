import axios from 'axios';

function getAllCountries() {
    const request = axios.get('https://restcountries.com/v3.1/all?fields=name')
    const countries = request.then(r => r.data)
    return countries
}

function getCountry(name) {
    const request = axios.get(`https://restcountries.com/v3.1/name/${name}`)
    const country = request.then(r => r.data)
    return country
}


export function getCapitalWeather(location) {
    const api_key = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}&aqi=no`
    console.log(url);
    const request = axios.get(url)
    // const request = axios.get(`http://api.weatherapi.com/v1/current.json`, { params: { key: api_key, q: capital, } }) //TODO: testar
    return request.then(r => r.data)
}

export function getWeatherMeteo(location) {
    const url = `https://api.open-meteo.com/v1/forecast`
    const params = {
        latitude: location[0],
        longitude: location[1],
        current: ["temperature_2m", "relative_humidity_2m", "is_day", "apparent_temperature", "rain", "showers", "weather_code", "cloud_cover", "precipitation", "pressure_msl", "wind_speed_10m", "wind_direction_10m"],
        timezone: "auto",
        forecast_days: 1,
    };
    console.log(url);
    const request = axios.get(url, { params })
    return request.then(r => r.data)
}

export default { getAll: getAllCountries, getCountry, getCapitalWeather, getWeatherMeteo };