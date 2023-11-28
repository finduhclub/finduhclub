import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a profile card. See pages/ViewProfile.jsx. */
const ClubAdmin = ({ club }) => (
  <Card className="h-100" width={100}>
    <Card.Header>
      <Card.Img src={club.image} width={75} />
      <Card.Title>{club.name}</Card.Title>
      <Card.Subtitle>{club.description}</Card.Subtitle>
      <br />
      <Card.Subtitle>Email: {club.clubEmail}</Card.Subtitle>
      <br />
      <Card.Subtitle>Club Time: {club.clubTime}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        <ul>{club.interests.map(interest => <li>{interest}</li>)}</ul>
      </Card.Text>
      <br />
      <Link to={`/clubAdmin/edit/${club._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ClubAdmin.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    clubTime: PropTypes.string,
    clubEmail: PropTypes.string,
    interests: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }).isRequired,
};
export default ClubAdmin;
