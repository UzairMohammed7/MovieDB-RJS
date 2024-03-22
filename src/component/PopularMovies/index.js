import {Component} from 'react'
import Loader from 'react-loader-spinner'

import MoviePoster from '../MoviePoster'
import Pagination from '../Pagination'

import './index.css'

class PopularMovies extends Component {
  state = {
    isLoading: true,
    popularMovieResponse: {},
  }

  componentDidMount() {
    this.getPopularMoviesResponse()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getPopularMoviesResponse = async (page = 1) => {
    const API_KEY = '2f0a9d3f7243feaeb4f1b77d292c646e'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const popularMoviesData = await response.json()
    const popularMoviesUpdatedData = this.getUpdatedData(popularMoviesData)
    this.setState({
      isLoading: false,
      popularMovieResponse: popularMoviesUpdatedData,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderPopularMoviesList = () => {
    const {popularMovieResponse} = this.state

    return (
      <ul className="movie-list">
        {popularMovieResponse.results.map(movie => (
          <MoviePoster key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, popularMovieResponse} = this.state

    return (
      <>
        <div className="route-page-body">
          {isLoading
            ? this.renderLoadingView()
            : this.renderPopularMoviesList()}
        </div>
        <Pagination
          totalPages={popularMovieResponse.totalPages}
          apiCallback={this.getPopularMoviesResponse}
        />
      </>
    )
  }
}

export default PopularMovies
