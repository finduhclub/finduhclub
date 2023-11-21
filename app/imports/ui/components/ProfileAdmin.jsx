import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

/** Renders a profile card used in List Profiles (Admin). See pages/ViewProfile.jsx. */
const ProfileAdmin = ({ profile }) => (
  <Card className="h-100" width={100}>
    <Card.Header>
      <Card.Img src={profile.image} width={75} />
      <Card.Title>{profile.username}</Card.Title>
      <Card.Subtitle>{profile.membership}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        <ul>{profile.interests.map(interest => <li>{interest}</li>)}</ul>
      </Card.Text>
      <br />
      <footer className="blockquote-footer">{profile.ownerID}</footer>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ProfileAdmin.propTypes = {
  profile: PropTypes.shape({
    username: PropTypes.string,
    image: PropTypes.string,
    membership: PropTypes.string,
    interests: PropTypes.arrayOf(PropTypes.string),
    ownerID: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ProfileAdmin;
