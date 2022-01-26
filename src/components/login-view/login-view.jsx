import React, { useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Form, Button, Card, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

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
    <Container className="loginContainer" >
    
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
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                className="mb-3" 
                type="password" 
                value={password}
                placeholder="*required field"
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="loginButton" variant="dark" size="lg" type="submit" onClick={handleSubmit}>
              Login
            </Button>
          </Form>
          <Card.Subtitle className="mt-4 text-muted text-center">You don't have an account? Then register</Card.Subtitle>
          <Link to={`/register`}>
            <Button className="registerButton" variant="dark" size="lg">Register</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
    
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (username, password) => dispatch(handleSubmit(username, password))
});

export default connect(null, mapDispatchToProps)(LoginView);
