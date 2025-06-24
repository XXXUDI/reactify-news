import { useState, useEffect } from "react";


export const useFetch = (fetchFunc, params) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Convert params object to URLSearchParams string if it exists
    // This is useful for GET requests where parameters are passed in the URL
    const stringParams = params ? new URLSearchParams(params).toString() : '';

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetchFunc(params);
                setData(response);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [fetchFunc, stringParams]);

    return { data, isLoading, error };
}