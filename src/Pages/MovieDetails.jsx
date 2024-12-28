import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import backup from '../assets/backup.jpg'
import { convertMinutes } from '../Utils/utils'

export const MovieDetails = () => {

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams()

  const key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${key}`;

    {/* fetch for api data */ }
    async function fetchMovies() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setMovie(jsonData || []);

      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
      return { loading, error }
    }

    fetchMovies();

    return () => {
      controller.abort(); // Cleanup fetch on component unmount
    };
  }, []);

  useEffect(() => {
    document.title = `${movie.title}`
  },)
  {/* Getting data from state variable */ }
  const image = movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : backup;
  const { title, overview, vote_average, vote_count, runtime, revenue, budget, release_date, genres } = movie

  return (
    <>
      <main className="container">
        <h5 className="text-primary py-2 border-bottom mb-3">{movie.title}</h5>
        <div className="row">
          <div className="col-md-4">
            <img src={image} alt="movie-img" className="img-fluid img-thumbnail" />
          </div>
          <div className="col-md-8">
            <h3 className="text-primary">{title}</h3>
            <p className="mt-3 text-light">{overview}</p>

            {genres ? (
              <p className="d-flex gap-3">
                {genres.map((genre) => (
                  <span key={genre.id} className="badge bg-danger">
                    {genre.name}</span>
                ))}
              </p>
            ) : ""}

            <p className="mt-3 text-light">
              <i className="bi bi-star-fill text-warning"></i>{vote_average} | <i className="bi bi-people-fill text-success"></i> {vote_count} Reviews
            </p>

            <table className="table table-bordered w-50 mt-2 text-light">
              <tbody>
                <tr>
                  <th>Run Time</th>
                  <td>{convertMinutes(runtime)}</td>
                </tr>
                <tr>
                  <th>Budget</th>
                  <td>{budget}</td>
                </tr>
                <tr>
                  <th>Revenue</th>
                  <td>{revenue}</td>
                </tr>
                <tr>
                  <th>Release Date</th>
                  <td>{release_date}</td>
                </tr>
              </tbody>
            </table>

            <a className="btn btn-warning" target="_blank" href={`https://www.imdb.com/title/${movie.imdb_id}/`}>
              View in Imdb</a>
          </div>
        </div>
      </main>
    </>
  )
}


