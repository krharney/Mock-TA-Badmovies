import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      favorites: [{ deway: "favorites" }],
      showFaves: false,
    };
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies(genre) {
    // make an axios request to your server on the GET SEARCH endpoint
    axios.get('/search', { params: { genre: genre || "28" } })
      .then((response) => {
        this.setState({
          movies: response.data.results
        })
        console.log('response.results ', response.results)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  saveMovie() {
    // same as above but do something diff
  }

  deleteMovie() {
    // same as above but do something diff
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render() {
    return (
      <div className="app">
        <header className="navbar"><h1>Bad Moviesss</h1></header>

        <div className="main">
          <Search getMovies={this.getMovies} swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} />
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));