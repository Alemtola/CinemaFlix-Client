import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from 'axios';

import './movie-view.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';

export class MovieView extends React.Component {

  constructor(props) {
    super(props);

  }

  addFavoriteMovie() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://immense-reef-38292.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST'
    })
      .then(response => {
        alert(`Added to Favorites List`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (

      <Container className="moviesContainer">
        <Row>
          <Col>
            <div className="movie-view">
              <div className="movie-poster">
                <img src={movie.ImagePath} crossOrigin="true" />
              </div>
              <div className="movie-title">
                <span className="title">Title: </span>
                <span className="value">{movie.Title}</span>
              </div>
              <div className="movie-year">
                <span className="year">Release Year: </span>
                <span className="value">{movie.ReleaseYear}</span>
              </div>
              <div className="movie-description">
                <span className="description">Description: </span>
                <span className="value">{movie.Description}</span>
              </div>
              <div className="movie-genre">
                <span className="genre">Genre: </span>
                <span className="value">{movie.Genre.Name}</span>
              </div>
              <div className="movie-director">
                <span className="director">Director: </span>
                <span className="value">{movie.Director.Name}</span>
              </div>
              <div className="movie-actors">
                <span className="actors">Actors: </span>
                <span className="value">{movie.Actors}</span>
              </div>
              <div className="movie-feature">
                <span className="featured">Featured: </span>
                <span className="value">Yes</span>
              </div>

              <div className="director-button-div">
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button className="director-button" bg="dark" variant="dark">Director</Button>
                </Link>
              </div>

              <div className="genre-button-div">
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button className="genre-button" bg="dark" variant="dark">Genre</Button>
                </Link>
              </div>

              <div className="movie-button-div">
                <Button className="movie-button" bg="dark" variant="dark" onClick={() => { onBackClick(null); }}>Back</Button>
              </div>

              <div className="fav-button-div">
                <Button bg="danger" variant="danger" className="fav-button" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>
                  Add to Favorites
                </Button>
              </div>

             


            </div>
          </Col>
        </Row>
        
       </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.number.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Actors: PropTypes.array.isRequired,
    Featured: PropTypes.bool,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};
