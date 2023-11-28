import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a profile card. See pages/ViewProfile.jsx. */
const Profile = ({ profile }) => (
  <Card className="h-100" width={100}>
    <Card.Header>
      <Card.Img src={profile.image} width={75} />
      <Card.Title>{profile.name}</Card.Title>
      <Card.Subtitle>
        <ul id="clubs-list">{profile.clubs.map((club, index) => <li key={index}>{club}</li>)}</ul>
      </Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        <ul id="intrests-list">{profile.interests.map((interest, index) => <li key={index}>{interest}</li>)}</ul>
      </Card.Text>
      <br />
      <Link to={`/profile/edit/${profile._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Profile.propTypes = {
  profile: PropTypes.shape({
    owner: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    clubs: PropTypes.arrayOf(PropTypes.string),
    interests: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }).isRequired,
};

export default Profile;
