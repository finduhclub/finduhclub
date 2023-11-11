import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { TextField } from 'uniforms-bootstrap5';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id="landing-page" className="mt-auto py-3 text-center">
    <h1 className="text-white">Welcome to <br/> Find UH Clubs</h1>
  </Container>
);

export default Landing;
