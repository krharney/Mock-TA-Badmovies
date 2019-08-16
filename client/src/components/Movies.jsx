import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
  }

  // Make an onClick for each list item. If the movies shown is the search results, 
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)
  clickHandler(input) {
    console.log("id of movie", input)
    this.props.saveMovie(input)
  }

  render() {
    let movieList;
    if (this.props.movies.length > 0) {
      movieList = this.props.movies.map((movie) => {
        return (
          <li className="movie_item" key={movie.id || 0}>
            <img onClick={() => { this.clickHandler(movie) }} src={`http://image.tmdb.org/t/p/w185//${movie.poster_path}`} />
            <div className="movie_description">
              <h2>{movie.title}</h2>
              <section className="movie_details">
                <div className="movie_year">
                  <span className="title">Year</span>
                  <span>{movie.release_date.slice(0, 4)}</span>
                </div>
                <div className="movie_rating">
                  <span className="title">Rating</span>
                  <span>{movie.popularity}</span>
                </div>
              </section>
            </div>
          </li>
        )
      })
    } else {
      movieList = <li>Here is where movielist will go</li>;
    }
    return (
      <ul className="movies">
        {movieList}
      </ul>
    );
  }
}

export default Movies;