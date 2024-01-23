import {Component} from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'

import './index.css'

class TopRatedMovies extends Component {
  state = {topRatedMoviesList: [], isLoading: true}

  componentDidMount() {
    this.topRatedMoviesData()
  }

  topRatedMoviesData = async () => {
    const key = 'bdc9e7badf1357d7412ea98432343b0b'
    const api = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`
    const options = {
      method: 'GET',
    }
    const respose = await fetch(api, options)
    if (respose.ok) {
      const data = await respose.json()
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
        topRatedMoviesList: dataConvertedToCamelCase,
        isLoading: false,
      })
    }
  }

  Loader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="##ffffff" height={50} width={50} />
    </div>
  )

  getData = () => {
    const {topRatedMoviesList} = this.state
    return (
      <div>
        <h1>Top Rated</h1>
        <input type="textbox" />
        <ul className="un-list-moviecard">
          {topRatedMoviesList.map(each => (
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
export default TopRatedMovies
