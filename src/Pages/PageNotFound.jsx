import { Link } from 'react-router-dom'
import notfound from '../assets/error.jpg'

export const PageNotFound = () => {
  return (
    <div className="container">
      <img src={notfound} alt="error img" className="error-image" />
      <p className="text-center">
        <Link to={"/"} className='btn btn-danger mt-4'>Go to Home Page</Link>
      </p>
    </div>
  )
}


