import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/* Homepage for Standard Users */
const Home = () => (
  <Container id="home-page" className="py-3">
    <Row className="align-items-center justify-content-center">
      <Col id="welcome" className="align-items-center text-center" xs={5}>
        <h1 className="text-white">Welcome to <br /> Find UH Clubs</h1>
        <h5 className="text-white">Explore the vibrant campus life at the University of Hawaii at
          Mānoa with our user-friendly website, connecting students and clubs
          seamlessly. Discover the perfect club match for your interests and
          passions, fostering a dynamic and engaging university experience.
        </h5>
        <br />
      </Col>
    </Row>
  </Container>
);
export default Home;
