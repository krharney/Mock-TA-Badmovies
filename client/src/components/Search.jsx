import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selected: ''
    };
    this.getGenres = this.getGenres.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getGenres() {
    axios.get('/genres').then((response) => {
      this.setState({
        genres: response.data
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  handleChange(event) {
    this.setState({
      selected: event.target.value
    })
  }

  clickHandler(event) {
    event.preventDefault();
    console.log("clicked!");
    this.props.getMovies(this.state.selected);
  }

  componentDidMount() {
    this.getGenres();
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => { this.props.swapFavorites() }}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br /><br />

        <select onChange={this.handleChange}>
          {this.state.genres.map((element) => {
            return <option value={element.id} key={element.id}>{element.name}</option>
          })}
        </select>
        <br /><br />

        <button onClick={this.clickHandler}>Search</button>

      </div>
    );
  }
}

export default Search;