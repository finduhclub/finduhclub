import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card, Link } from 'react-bootstrap';
/* Renders a card with all Profile information. */
const ViewProfile = () => {
  const currentUser = Meteor.user();
  return ((
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>My Profile</h2>
          </Col>
          <Row>
            <Card className="h-100" width={100}>
              <Card.Header>
                <Card.Title>{currentUser.username}</Card.Title>
                <Card.Subtitle>{currentUser.username}</Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  {currentUser.profile.firstName}
                </Card.Text>
                <Link to="/profile/edit">Edit</Link>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  ));
};

export default ViewProfile;
