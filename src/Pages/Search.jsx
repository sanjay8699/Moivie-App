import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Card } from '../Components'
import { useFetch } from "../Hooks/useFetch"

export const Search = ({ apiPath }) => {
  {/* searchPharams hook to get query term from url */ }
  const [searchPharams] = useSearchParams();
  const queryTerm = searchPharams.get("q");
  {/* using custom hook to get movie details from api */ }
  const { data: movies } = useFetch(apiPath, queryTerm);

  useEffect(() => {
    document.title = `Search results for ${queryTerm}`
  }, [])

  return <main className="container">
    <h5 className="text-danger py-2 border-bottom">
      {movies.length == 0 ? `No Results found for ${queryTerm}` : `Results found for ${queryTerm}`}
    </h5>

    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 py-2">
      {/* using map function to display each movie */}
      {movies.map((movie) => {
        return <Card key={movie.id} movie={movie} />
      })}
    </div>
  </main>
}


