import {Component} from 'react'

const API_KEY = '2f0a9d3f7243feaeb4f1b77d292c646e'
class Home extends Component {
  componentDidMount() {
    this.getPopularMovies()
    this.getTopRatedMovies()
    this.getUpComingMovies()
    this.getSingleMovie()
    this.getMovieCastDetails()
    this.getMovieSearchResults()
  }

  getPopularMovies = async () => {
    const api = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    const res = await fetch(api)
    const popularMovies = await res.json()
    console.log(popularMovies)
  }

  getTopRatedMovies = async () => {
    const api = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    const res = await fetch(api)
    const topRatedMovies = await res.json()
    console.log(topRatedMovies)
  }

  getUpComingMovies = async () => {
    const api = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    const res = await fetch(api)
    const upcomingMovies = await res.json()
    console.log(upcomingMovies)
  }

  getSingleMovie = async () => {
    const api = `https://api.themoviedb.org/3/movie/1011985?api_key=${API_KEY}&language=en-US`
    const res = await fetch(api)
    const singleMovie = await res.json()
    console.log(singleMovie)
  }

  getMovieCastDetails = async () => {
    const api = `https://api.themoviedb.org/3/movie/624091/credits?api_key=${API_KEY}&language=en-US`
    const res = await fetch(api)
    const movieCast = await res.json()
    console.log(movieCast)
  }

  getMovieSearchResults = async () => {
    const api = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=Damsel&page=1`
    const res = await fetch(api)
    const movieSearchResults = await res.json()
    console.log(movieSearchResults)
  }

  render() {
    return (
      <div>
        <h1>Hii</h1>
        <img
          src="https://image.tmdb.org/t/p/w300/mExN6lJHmLeGjwDmDrNNjR4MdCq.jpg"
          alt="movie"
        />
        <img
          src="https://image.tmdb.org/t/p/w300/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg"
          alt="movie"
        />
      </div>
    )
  }
}
export default Home
