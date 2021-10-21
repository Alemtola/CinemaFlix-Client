import React from 'react';
//importing axios library to fetch movies from database
import axios from 'axios';
//importing the movie-card into the main-view
import { MovieCard } from '../movie-card/movie-card';
////importing the movie-view into the main-view
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    };
  }

  componentDidMount(){
    axios.get('https://immense-reef-38292.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }


  render() {
    const { movies, selectedMovie } = this.state;


    if (movies.length === 0) return <div className="main-view" />;

    return (
           <div className="main-view">
               {selectedMovie
                   ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                   : movies.map(movie => (<MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} /> ))
               }
           </div>
       );

  }


}
