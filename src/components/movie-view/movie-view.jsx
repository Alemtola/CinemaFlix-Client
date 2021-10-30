import React from 'react';
import PropTypes from "prop-types";

import './movie-view.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';

export class MovieView extends React.Component {

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
                <span className="year">ReleaseYear: </span>
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
              <div className="genre-description">
                <span className="genre">Description: </span>
                <span className="value">{movie.Genre.Description}</span>
              </div>
              <div className="movie-director">
                <span className="director">Director: </span>
                <span className="value">{movie.Director.Name}</span>
              </div>
              <div className="director-bio">
                <span className="director">Bio: </span>
                <span className="value">{movie.Director.Bio}</span>
              </div>
              <div className="director-birthyear">
                <span className="director">BirthYear: </span>
                <span className="value">{movie.Director.BirthYear}</span>
              </div>
              <div className="movie-actors">
                <span className="actors">Actors: </span>
                <span className="value">{movie.Actors}</span>
              </div>
              <div className="movie-button-div">
                <Button className="movie-button" bg="dark" variant="dark" onClick={() => { onBackClick(null); }}>Back</Button>
              </div>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">Director</Button>
              </Link>

              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">Genre</Button>
              </Link>

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
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      BirthYear: PropTypes.number.isRequired,
    }),
    Actors: PropTypes.array.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};
