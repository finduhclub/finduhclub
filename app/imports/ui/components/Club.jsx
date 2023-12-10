import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

/** Renders a profile card. See pages/ViewProfile.jsx. */
const Club = ({ club }) => (
  <Card className="h-100" width={100}>
    <Card.Header>
      <Card.Img src={club.image} width={75} />
      <Card.Title>{club.name}</Card.Title>
      <br />
      <Card.Subtitle>Email: {club.clubEmail}</Card.Subtitle>
      <Card.Subtitle>Club Time: {club.clubTime}</Card.Subtitle>
      <br />
      <Card.Subtitle>
        <ul>{club.interests.map(interest => <li>{interest}</li>)}</ul>
      </Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        {club.description}
      </Card.Text>
      <br />
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Club.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    clubTime: PropTypes.string,
    clubEmail: PropTypes.string,
    interests: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Club;
