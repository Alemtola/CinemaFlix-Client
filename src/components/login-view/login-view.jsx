import React, { useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://immense-reef-38292.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <Container fluid className="loginContainer" >

      <Navbar bg="navColor" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">CinemaFlix</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#logout">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    
      <Card className="loginCard">
        <Card.Body>
          <Card.Title className="text-center">Welcome to CinemaFlix.</Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">Please Login</Card.Subtitle>
      
          <Form >
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="*required field"
                onChange={e => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                className="mb-3" 
                type="password" 
                placeholder="*required field"
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="loginButton" variant="secondary" size="lg" type="submit" onClick={handleSubmit}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
    
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
