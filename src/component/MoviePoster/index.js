import {Link} from 'react-router-dom'
import './index.css'

const MoviePoster = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <li className="movie-card-container">
      <img className="movie-card-image" alt={title} src={posterPath} />
      <div className="d-flex flex-column align-items-center mt-2">
        <h1 className="movie-title">{title}</h1>
        <p className="movie-rating mb-0 ms-1">Rating: {voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`} className="mt-auto align-self-center">
        <button className="view-details btn btn-outline-success" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MoviePoster
