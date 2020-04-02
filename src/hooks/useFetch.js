import { useState, useEffect} from 'react';

const useFetch = (url, options) => {

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        ( async () => {
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setLoading(false);
                setResult(json);
            }catch (e) {
                setError(e);
                setLoading(false);
            }
        })();
    }, [options, url]);

    return {
        loading, result, error
    };
};

export default useFetch;