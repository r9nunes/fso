import { useState } from 'react';
import { Loading, LoadingError, Country, CountriesList, WeatherMeteo } from './Components';

import services from './ApiServices';
import WeatherHook from './weather-hook.js';
import CountriesHook from './country-hook.js';

import util from './util.js'

import "./style.css";

const App = () => {

  const [country, setCountry] = useState({})
  const [selectedCountries, setSelectedCountries] = useState([])

  const { allCountries, loadingCountries, errorMessage } = CountriesHook.useCountries();
  const weather = WeatherHook.useWeather(country.location);

  function loadCountry(countryName) {
    services
      .getCountry(countryName)
      .then(data => setCountry(util.buildCountryObject(data)))
  }

  const handleFilter = (event) => {
    if (loadingCountries) return;

    const input = event.target.value;
    setCountry({})

    if (!input || input.length <= 0)
      return

    const allCountriesList = allCountries.filter(
      (c) => c.official.toUpperCase().includes(input.toUpperCase())
    )

    setSelectedCountries(allCountriesList)

    if (allCountriesList.length !== 1)
      return

    const countryName = allCountriesList[0].official;
    setSelectedCountries([countryName]);
    loadCountry(countryName)
  }

  function handleSelectCountry(countryName) {
    setSelectedCountries([countryName]);
    loadCountry(countryName)
  }

  if (loadingCountries) return <Loading />

  if (errorMessage) return <LoadingError message={errorMessage} />

  function renderContent() {
    if (selectedCountries.length > 10)
      return <div> <p> Too many countries, specify another filter </p> </div>
    if (selectedCountries.length > 1 && selectedCountries.length < 11)
      return <div>  <CountriesList list={selectedCountries} select={handleSelectCountry} /> </div>
    if (selectedCountries.length === 1)
      return (<div>
        <Country data={country} />
        {country.capital && <WeatherMeteo data={weather} />}
      </div>)
    return <><p> Use filter to find country...</p></>
  }

  return (<>
    <div>
      find countries: <input id="i-find-countries" onChange={handleFilter} disabled={loadingCountries} />
    </div>
    {renderContent()}
  </>
  )
}

export default App
