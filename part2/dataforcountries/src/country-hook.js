import { useState, useEffect } from 'react';

import services from './ApiServices';

export function useCountries() {

    const [allCountries, setAllCountries] = useState([])
    const [loadingCountries, setLoadingCountries] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        services.getAll()
            .then(raw =>
                setAllCountries(
                    raw.map(c => ({
                        name: c.name.common,
                        official: c.name.official
                    }))
                )
            )
            .catch(() => setErrorMessage('Erro ao carregar países'))
            .finally(() => setLoadingCountries(false));
    }, []);

    return { allCountries, loadingCountries, errorMessage };
}

export default { useCountries }