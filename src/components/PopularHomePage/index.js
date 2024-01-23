import {Component} from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'

import './index.css'

class PopularHomePage extends Component {
  state = {popularMoviesData: [], isLoading: true}

  componentDidMount() {
    this.poluarMovieApi()
  }

  poluarMovieApi = async () => {
    const apiKey = 'bdc9e7badf1357d7412ea98432343b0b'
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {results} = data
      const dataConvertToCamelCase = results.map(each => ({
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
        popularMoviesData: dataConvertToCamelCase,
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
    const {popularMoviesData} = this.state
    console.log(popularMoviesData)
    return (
      <div>
        <h1>Popular</h1>
        <input type="textbox" />
        <ul className="unlist-movie-cards">
          {popularMoviesData.map(each => (
            <MovieCard key={each.id} movieData={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="bg-container">
        {isLoading ? this.Loader() : this.getData()}
      </div>
    )
  }
}
export default PopularHomePage
