import React from 'react';
//importing axios library to fetch movies from database
import axios from 'axios';

import './main-view.scss';
//importing the registration view into the main-view
import { RegistrationView } from '../registration-view/registration-view';
//importing the login view into the main-view
import { LoginView } from '../login-view/login-view';
//importing the movie-card into the main-view
import { MovieCard } from '../movie-card/movie-card';
////importing the movie-view into the main-view
import { MovieView } from '../movie-view/movie-view';

import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
    };
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



    /*When a movie is clicked, this function is invoked and updates the state of
  the `selectedMovie` *property to that movie*/
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  //When a user successfully registers
  onRegistration(register) {
    this.setState({
      register,
    });
  }


  render() {
    const { movies, selectedMovie, user, register } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user
    logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return (<LoginView onLoggedIn={user => this.onLoggedIn(user)} />);

    //if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

    // Before the movies have been loaded
    if (movies.length === 0) return (<div className="main-view" />);

    return (
           <div className="main-view">
              <Navbar bg="navColor" variant="dark" expand="lg">
                <Container fluid>
                  <Navbar.Brand href="#home">CinemaFlix</Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link href="#home">Movies</Nav.Link>
                    <Nav.Link href="#user">Profile</Nav.Link>
                    <Nav.Link href="../login-view/login-view.jsx" onClick={() => { this.onLoggedOut() }} >Logout</Nav.Link>
                  </Nav>
                </Container>
              </Navbar>
              <div>
                <Container>
                  {selectedMovie
                    ? (
                      <Row className="justify-content-lg-center">
                        <Col lg={9} >
                          <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                        </Col>
                      </Row>
                    )
                    : (
                      <Row className="justify-content-lg-center">
                        { movies.map(movie => (
                          <Col lg={3} md={4} sm={6} >
                            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                          </Col>
                          ))
                        }
                      </Row>
                    )  
                  }
                </Container>
              </div>
               
           </div>
    );

  }

}
