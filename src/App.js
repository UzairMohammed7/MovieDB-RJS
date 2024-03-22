import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Navbar from './component/Navbar'
import PopularMovies from './component/PopularMovies'
import TopRatedMovies from './component/TopRatedMovies'
import UpcomingMovies from './component/UpcomingMovies'
import SearchQuery from './component/SearchQuery'
import './App.css'

import SearchContext from './context/SearchContext'

const API_KEY = '2f0a9d3f7243feaeb4f1b77d292c646e'

class App extends Component {
  state = {
    searchResponse: {},
    apiStatus: 'INITIAL',
    searchInput: '',
  }

  onChangeSearchInput = value => {
    this.setState({searchInput: value})
  }

  onTriggerSearchingQuery = async (page = 1) => {
    const {searchInput} = this.state
    this.setState({apiStatus: 'IN_PROGRESS'})
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const searchData = await response.json()
      console.log(searchData)
      const updatedSearchData = {
        totalPages: searchData.total_pages,
        totalResults: searchData.total_results,
        results: searchData.results.map(eachMovie => ({
          id: eachMovie.id,
          posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
          voteAverage: eachMovie.vote_average,
          title: eachMovie.title,
        })),
      }
      console.log(updatedSearchData)
      this.setState({apiStatus: 'SUCCESS'})
      this.setState({searchResponse: updatedSearchData})
    }
  }

  render() {
    const {searchResponse, apiStatus, searchInput} = this.state
    return (
      <SearchContext.Provider
        value={{
          searchResponse,
          apiStatus,
          searchInput,
          onTriggerSearchingQuery: this.onTriggerSearchingQuery,
          onChangeSearchInput: this.onChangeSearchInput,
        }}
      >
        <div className="App d-flex flex-column">
          <Navbar />
          <Switch>
            <Route exact path="/" component={PopularMovies} />
            <Route exact path="/top-rated" component={TopRatedMovies} />
            <Route exact path="/upcoming" component={UpcomingMovies} />
            <Route exact path="/search" component={SearchQuery} />
          </Switch>
        </div>
      </SearchContext.Provider>
    )
  }
}

export default App
