import { useState, useEffect } from 'react';
import services from './ApiServices'

export function useWeather(location) {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        console.log("[weather-hook]",location)
        if (!location) return;
        services
            // .getCapitalWeather(capital)
            .getWeatherMeteo(location)
            .then(data => { setWeather(data); console.log('[weather-hook(data)]',data) })
            .catch(() => setWeather(null))
    }, [location]);

    return weather;
}

export default { useWeather }