import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Row className="align-middle text-center">
        <Col className="text-align-start">
          <u><strong>Contact Us</strong></u>
          {' '}
          <br />
          Email: finduhclubs@hawaii.edu
          <br />
          Phone Number: (808) 956-8111
          {' '}
          <br />
        </Col>

        <Col className="text-align-end">
          <strong>University of Hawaii at Manoa</strong>
          {' '}
          <br />
          2500 Campus Rd, Honolulu, HI 96822
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
