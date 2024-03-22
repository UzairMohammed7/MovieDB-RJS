import React from 'react'
import Loader from 'react-loader-spinner'

import MoviePoster from '../MoviePoster'
import Pagination from '../Pagination'

import './index.css'

class TopRatedMovies extends React.Component {
  state = {
    isLoading: true,
    topRatedMovieResponse: {},
  }

  componentDidMount() {
    this.getTopRatedMoviesResponse()
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

  getTopRatedMoviesResponse = async (page = 1) => {
    const API_KEY = '2f0a9d3f7243feaeb4f1b77d292c646e'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const topRatedMoviesData = await response.json()
    const topRatedNewData = this.getUpdatedData(topRatedMoviesData)
    this.setState({isLoading: false, topRatedMovieResponse: topRatedNewData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderTopRatedMovies = () => {
    const {topRatedMovieResponse} = this.state
    const {results} = topRatedMovieResponse

    return (
      <ul className="movie-list">
        {results.map(movie => (
          <MoviePoster key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, topRatedMovieResponse} = this.state

    return (
      <>
        <div className="route-page-body">
          {isLoading ? this.renderLoadingView() : this.renderTopRatedMovies()}
        </div>
        <Pagination
          totalPages={topRatedMovieResponse.totalPages}
          apiCallback={this.getTopRatedMoviesResponse}
        />
      </>
    )
  }
}

export default TopRatedMovies
