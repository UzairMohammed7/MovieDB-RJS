import React from 'react'
import Loader from 'react-loader-spinner'

import MoviePoster from '../MoviePoster'
import Pagination from '../Pagination'

import './index.css'

class UpcomingMovies extends React.Component {
  state = {
    isLoading: true,
    upcomingMovieResponse: {},
  }

  componentDidMount() {
    this.getUpcomingMoviesResponse()
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

  getUpcomingMoviesResponse = async (page = 1) => {
    const API_KEY = '2f0a9d3f7243feaeb4f1b77d292c646e'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const upcomingMoviesData = await response.json()
    const upcomingNewData = this.getUpdatedData(upcomingMoviesData)
    this.setState({isLoading: false, upcomingMovieResponse: upcomingNewData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderUpcomingMoviesList = () => {
    const {upcomingMovieResponse} = this.state
    const {results} = upcomingMovieResponse

    return (
      <ul className="movie-list">
        {results.map(movie => (
          <MoviePoster key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, upcomingMovieResponse} = this.state

    return (
      <>
        <div className="route-page-body">
          {isLoading
            ? this.renderLoadingView()
            : this.renderUpcomingMoviesList()}
        </div>
        <Pagination
          totalPages={upcomingMovieResponse.totalPages}
          apiCallback={this.getUpcomingMoviesResponse}
        />
      </>
    )
  }
}

export default UpcomingMovies
