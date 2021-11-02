import React from 'react';
import PropTypes from 'prop-types';

import './genre-view.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';

export class GenreView extends React.Component {
  render() {

    const { genre, onBackClick } = this.props;

    return (
      <Container className="genreContainer">
        <Row>
          <Col>
            <div className="genre-view">
              <div className="genre-name">
                <span className="name">Name:</span>
                <span className="value">{genre.Name}</span>
              </div>

              <div className="genre-description">
                <span className="description">Description:</span>
                <span className="value">{genre.Description}</span>
              </div>

              <div className="genre-button-div">
                <Button className="genre-button" variant="secondary" className="mt-3" onClick={() => { onBackClick(null); }}>Back</Button>
              </div>
              
            </div>
          </Col>
        </Row>
      </Container >
    );
  }
}

GenreView.propTypes = {
  movie: PropTypes.shape({
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
  })
};