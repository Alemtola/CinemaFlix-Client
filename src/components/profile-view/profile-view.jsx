import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './profile-view.scss';

import { MovieCard } from '../movie-card/movie-card';

import { Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { setUser, updateUser } from '../../actions/actions';

import { connect } from 'react-redux';


export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  // Current User profile data

  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://immense-reef-38292.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  // Edit current User profile

  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://immense-reef-38292.herokuapp.com/users/${username}`,
      {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday
        });
        localStorage.setItem('user', this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert("Profile updated.");
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  // Delete A Favorite Movie From Users Favorite 

  onRemoveFavorite() {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://immense-reef-38292.herokuapp.com/users/${username}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Delete A User

  onDeleteUser() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.delete(`https://immense-reef-38292.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        alert('Profile has been deleted.');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }


  render() {

    const { onBackClick, movies, user } = this.props;

    const FavoriteMovies = movies.filter(m => {
      return this.state.FavoriteMovies.includes(m._id)
    });

    return (
      <Container className="profile-view">
        <div className="top-elements d-flex flex-row justify-content-end align-items-baseline">
          <div className="mr-5">
            <p className="signin-as">Signed in as :  <span> <Link to={`/users/${user}`}>{this.state.Username}</Link> </span> </p>
          </div>
          <Button className="profile-Logout-Button" bg="danger" variant="danger" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          <Button className="backProfileButton" variant="danger" onClick={() => { onBackClick() }}>Back</Button>
        </div>

        <Row>
          <Col >
            <Card className="your-profile">           
             <Card.Body>
                <Card.Title> 
                  <span className="card-title">YOUR PROFILE</span> 
                </Card.Title>
                <Card.Text>
                    <div>
                      <span className="username">Username: </span>
                      <span className="value">{this.state.Username}</span>
                    </div>     
                </Card.Text>
                <Card.Text>
                    <div>
                      <span className="email">Email: </span>
                      <span className="value">{this.state.Email}</span>            
                    </div>
                </Card.Text>
                <Card.Text>
                    <div>
                      <span className="birthday">Birthday: </span>
                      <span className="value">{this.state.Birthday}</span>            
                    </div>
                </Card.Text>
                <div className="delete-profile-button">
                  <Button variant="danger" onClick={() => this.onDeleteUser()} >Delete Profile</Button>
                </div>
             </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
              <Card className="update-profile">
                  <Card.Body>
                    <Card.Title className="text-center"> <span className="update-title">UPDATE PROFILE</span> </Card.Title>
                    <Form className="formDisplay" onSubmit={(e) => this.editUser(e)}>
                      <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                          type='text' 
                          name="Username" 
                          placeholder="New Username" 
                          onChange={(e) => this.setUsername(e.target.value)} required 
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                          type="password" 
                          name="Password" 
                          placeholder="New Password" 
                          onChange={(e) => this.setPassword(e.target.value)} required 
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                          type="email" 
                          name="Email" 
                          placeholder="New Email" 
                          onChange={(e) => this.setEmail(e.target.value)} required 
                        />

                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control 
                          type="date" 
                          name="Birthday" 
                          onChange={(e) => this.setBirthday(e.target.value)} 
                        />
                      </Form.Group>

                      <div className="update-profile-button">
                        <Button variant="dark" type="submit" >Update Profile</Button>
                      </div>
                    </Form>
                                
                  </Card.Body>
              </Card>
            </Col>
        </Row>

        <div>
          <h3 className="favorite-Movies-title">Favorite Movies</h3>
        </div>
        
        <Row className="favoriteMovied-col"> 
          { FavoriteMovies.map((movie) => (
           
            <Col   sm={6} md={4} lg={4} key={movie._id}>
              <div className="favoriteMoviediv" >
                <MovieCard movie={movie} />
                <Button className="unfavoriteMovieButton" variant="danger" onClick={() => { this.onRemoveFavorite(movie._id) }} >Remove Favorite</Button>
              </div>
            </Col>
            
          ))
        }
         
        </Row>
              
            
        
       
      </Container>
    );
  }
}

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps, {setUser, updateUser})(ProfileView);