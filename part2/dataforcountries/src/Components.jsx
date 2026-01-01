import util from './util.js'

export function Loading() {
  return (<><p> Loading countries data... Wait for system be ready.</p></>);
}

export function LoadingError({ message }) {
  return (<><p> System unavailable: {message} </p></>);
}

export function Filter({ handleFilter }) {
  return (
    <div>
      filter shown with <input id="input#name#filter" onChange={handleFilter} />
    </div>
  )
}

export function CountriesList({ list: countries, select }) {
  return (<ul>
    {countries.map(
      (c) =>
        <li key={c.official}>
          {c.name} ({c.official}) <button onClick={() => select(c.official)}> select </button>
        </li>
    )}
  </ul>)
}

export function Weather({ data }) {
  console.log('<Weather>: ', data);

  if (!data || Object.keys(data).length == 0) {
    return <p>Carregando clima...</p>;
  }

  return (
    <div className="weather">
      <img
        src={data.current.condition.icon}
        alt={data.current.condition.text}
        className="weather-icon"
        float="right" />

      <div className="weather-info">
        <h3> Tempo em  {data.location.name} </h3>
        <p>{data.current.temp_c} °C</p>
        <p>{data.current.condition.text}</p>
        <p>{data.current.condition.code}</p>
      </div>
    </div >
  )
}

export function WeatherMeteo({ data }) {
  console.log('<WeatherMeteo>:', data);
  if (!data || !data.current) {
    return <p>Loading weather data...</p>;
  }
  const c = data.current;
  const u = data.current_units;
  return (
    <div className="weather">
      <div className="weather-info">
        <h3>Weather at {data.latitude}/{data.longitude} (lat/long) </h3>
        <p> Temperature: {c.temperature_2m} {u.temperature_2m} </p>
        <p> Sensação térmica: {c.apparent_temperature} {u.apparent_temperature} </p>
        <p> Umidade: {c.relative_humidity_2m} {u.relative_humidity_2m} </p>
        <p> Vento: {c.wind_speed_10m} {u.wind_speed_10m} ({c.wind_direction_10m}°) </p>
        <p> Nebulosidade: {c.cloud_cover} {u.cloud_cover} </p>
        <p> Código do tempo: {c.weather_code} </p>
      </div>
    </div>
  );
}

export function Country({ data: country }) {
  if (!country || Object.keys(country).length == 0)
    return <div> ERROR! </div>
  return (
    <div className="country">
      <div className="country-info">
        <h2>{country.name}</h2>
        <p>oficial name: {util.flat(country.official)}</p>
        <p>Capital: {util.flat(country.capital)}</p>
        <p>Area: {country.area}</p>
      </div>
      <div>
        {<img src={country.flag} />}
      </div>
    </div>)
}
