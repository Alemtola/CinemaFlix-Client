import React from 'react';
//importing axios library to fetch movies from database
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './main-view.scss';
//importing the registration view into the main-view
import { RegistrationView } from '../registration-view/registration-view';
//importing the login view into the main-view
import { LoginView } from '../login-view/login-view';
//importing the movie-card into the main-view
import { MovieCard } from '../movie-card/movie-card';
//importing the movie-view into the main-view
import { MovieView } from '../movie-view/movie-view';
//importing the director-view into the main-view
import { DirectorView } from '../director-view/director-view';
//importing the director-view into the main-view
import { GenreView } from '../genre-view/genre-view';

import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://immense-reef-38292.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assigns the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /* When a user successfully logs in, this function updates the `user`
  property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }


  render() {
    const { movies, user } = this.state;

    return (
           <div className="main-view">
             <Router>
                
                <Container fluid>
                  <Navbar bg="navColor" variant="dark" expand="lg">
                      <Navbar.Brand href="#home">CinemaFlix</Navbar.Brand>
                      <Nav className="me-auto">
                        <Nav.Link href="#home">Movies</Nav.Link>
                        <Nav.Link href="#user">Profile</Nav.Link>
                        <Nav.Link href="../login-view/login-view.jsx" onClick={() => { this.onLoggedOut() }} >Logout</Nav.Link>
                      </Nav>
                  </Navbar>
                </Container>
              
                <div>
                  <Container>
                    <Row className="main-view justify-content-md-center">

                      <Route exact path="/" render={() => {

                        if (!user) return <Col>
                          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        // Before the movies have been loaded
                        if (movies.length === 0) return (<div className="main-view" />);
                        return movies.map(m => (
                          <Col sm={6} md={4} lg={3} key={m._id}>
                            <MovieCard movie={m} />
                          </Col>
                        ))
                      }} />

                      <Route path="/register" render={() => {
                        return <Col>
                          <RegistrationView />
                        </Col>
                      }} />

                      <Route path="/movies/:movieId" render={({ match, history }) => {

                        if (!user) return <Col>
                          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        if (movies.length === 0) return (<div className="main-view" />);
                        return <Col md={8}>
                          <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                      }} />

                      <Route path="/directors/:name" render={({ match, history }) => {

                        if (!user) return <Col>
                          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                          <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                        </Col>
                      }
                      } />

                      <Route path="/genres/:name" render={({ match, history }) => {

                        if (!user) return <Col>
                          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                          <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                      }
                      } />

                    </Row>
                  </Container>
                </div>
              </Router>  
           </div>
    );

  }

}
