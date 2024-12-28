import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from '../Components'
import { useFetch } from "../Hooks/useFetch"

export const MovieList = ({ title, apiPath }) => {

  {/* using custom hook to get movie details from api */ }
  const { data: movies } = useFetch(apiPath)

  useEffect(() => {
    document.title = title
  }, [title])

  const navigator = useNavigate()

  return (
    <main className="container">

      {/* conditional rendering for home page */}
      {title == "Your Guide to Great Movies" ?
        <div className="bg-light p-5 border mb-5">
          <h3 className="text-primary">Welcome to MoviesHunt</h3>
          <p className="lead">Discover movies you'll love with personalized suggestions, curated collections, and quick searches-your guide to finding great films</p>
          <button className="btn btn-primary" onClick={() => { navigator("/movies/upcoming") }}>Explore Now</button>
        </div> : ""}

      {/* Page Title */}
      <h5 className="text-danger border-bottom py-2 ">{title}</h5>

      {/* Movie list cards */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 py-2">
        {/* using map function to display each movie */}
        {movies.map((movie) => {
          return <Card key={movie.id} movie={movie} />
        })}
      </div>
    </main>
  )
}


