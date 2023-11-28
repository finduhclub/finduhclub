import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

/** Renders a profile card used in List Profiles (Admin). See pages/ViewProfile.jsx. */
const ProfileAdmin = ({ profile }) => (
  <Card className="h-100" width={100}>
    <Card.Header>
      <Card.Img src={profile.image} width={75} />
      <Card.Title>{profile.name}</Card.Title>
      <Card.Subtitle>
        <ul>{profile.clubs.map(club => <li>{club}</li>)}</ul>
      </Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        <ul>{profile.interests.map(interest => <li>{interest}</li>)}</ul>
      </Card.Text>
      <br />
      <footer className="blockquote-footer">{profile.owner}</footer>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ProfileAdmin.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    owner: PropTypes.string,
    clubs: PropTypes.arrayOf(PropTypes.string),
    interests: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }).isRequired,
};

export default ProfileAdmin;
