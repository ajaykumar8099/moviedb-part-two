import {Component} from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'

import './index.css'

class UpcomingMovies extends Component {
  state = {upcomingMoviesList: [], isLoading: true}

  componentDidMount() {
    this.getUpcomingMoviesData()
  }

  getUpcomingMoviesData = async () => {
    const key = 'bdc9e7badf1357d7412ea98432343b0b'
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {results} = data
      const dataConvertedToCamelCase = results.map(each => ({
        adult: each.adult,
        backdropPath: each.backdrop_path,
        genreIds: each.genre_ids,
        id: each.id,
        originalLanguage: each.original_language,
        originalTitle: each.original_title,
        overview: each.overview,
        popularity: each.popularity,
        posterPath: each.poster_path,
        releaseDate: each.release_date,
        title: each.title,
        video: each.video,
        voteAverage: each.vote_average,
        voteCount: each.vote_count,
      }))
      this.setState({
        upcomingMoviesList: dataConvertedToCamelCase,
        isLoading: false,
      })
    }
  }

  Loader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  getData = () => {
    const {upcomingMoviesList} = this.state
    return (
      <div>
        <h1>Upcoming</h1>
        <input type="textbox" />
        <ul className="unlist-movidb">
          {upcomingMoviesList.map(each => (
            <MovieCard key={each.id} movieData={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <div className="bg-container">
          {isLoading ? this.Loader() : this.getData()}
        </div>
      </>
    )
  }
}
export default UpcomingMovies
