import React from 'react';
//importing the movie-card into the main-view
import { MovieCard } from '../movie-card/movie-card';
////importing the movie-view into the main-view
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        { _id: 1,
          Title: 'Inception',
          Description: 'desc1...',
          ImagePath: 'inception.jpg'
        },
        { _id: 2,
          Title: 'The Shawshank Redemption',
          Description: 'desc2...',
          ImagePath: 'shawshank_redemption_ver2.jpg'
        },
        { _id: 3,
          Title: 'Gladiator',
          Description: 'desc3...',
          ImagePath: 'gladiator_ver1.jpg'
        }
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }


  render() {
    const { movies, selectedMovie } = this.state;


    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

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
