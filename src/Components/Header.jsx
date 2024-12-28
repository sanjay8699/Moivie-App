import { NavLink, useNavigate } from "react-router-dom"

export const Header = () => {

  const navigate = useNavigate()
  {/* function for navigate to search page */ }
  const handleSearch = (e) => {
    e.preventDefault();
    const queryTerm = e.target.search.value;
    e.target.reset();
    return navigate(`/search?q=${queryTerm}`)
  }


  return (
    <nav className="navbar navbar-expand-md fixed-top bg-dark navbar-dark">
      <div className="container-fluid">
        {/* Brand Name */}
        <NavLink to="/" className="navbar-brand">
          <i className="bi bi-film"></i> Movie Hunt
        </NavLink>
        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav me-auto ms-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/movies/top" className="nav-link">
                Top Rated
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/movies/popular" className="nav-link">
                Popular
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/movies/upcoming" className="nav-link">
                Upcoming
              </NavLink>
            </li>
          </ul>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="search"
              className="form-control"
              placeholder="Search"
              name="search"
            />
          </form>
        </div>

      </div>
    </nav>
  )
}
