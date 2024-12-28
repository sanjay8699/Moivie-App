import { useState, useEffect } from "react";

{/* Custom hook for fetching data from an API */ }
export const useFetch = (apiPath, queryTerm = "") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  {/* API key retrieved from environment variables */ }
  const key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    {/*  Perform the fetch call with the AbortController's signal */ }
    const controller = new AbortController();
    const signal = controller.signal;

    const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${key}&query=${queryTerm}`;

    async function fetchMovies() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setData(jsonData.results || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();

    return () => {
      controller.abort(); // Cleanup fetch on component unmount
    };
  }, [apiPath, queryTerm, key]);

  return { data, loading, error };
};
