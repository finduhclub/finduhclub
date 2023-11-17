import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* Renders a card with all Profile information. */
const ViewProfile = () => {
  const userName = Meteor.user().username;
  const firstName = Meteor.user({ fields: { 'profile.firstName': 1 } }).profile.firstName;
  const lastName = Meteor.user({ fields: { 'profile.lastName': 1 } }).profile.lastName;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>My Profile</h2>
          </Col>
          <Row>
            <Card className="h-100" width={100}>
              <Card.Header>
                <Card.Title>{firstName === undefined ? 'No first name' : firstName} {lastName}</Card.Title>
                <Card.Subtitle>{userName}</Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Link to="/profile/edit">Edit</Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewProfile;
