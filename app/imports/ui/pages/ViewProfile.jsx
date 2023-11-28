import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Col, Container, Row } from 'react-bootstrap';
import { Profiles } from '../../api/profiles/Profiles';
import { Clubs } from '../../api/clubs/Clubs';
import { ProfilesInterests } from '../../api/join/ProfilesInterests';
import { ProfilesClubs } from '../../api/join/ProfilesClubs';
import LoadingSpinner from '../components/LoadingSpinner';
import Profile from '../components/Profile';
import { getProfileData } from '../methods/methods.js';

/* Renders the Profile Collection as a set of Cards. */
const ViewProfile = () => {

  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesClubs.userPublicationName);
    const sub4 = Meteor.subscribe(Clubs.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
    };
  }, []);
  const userId = Meteor.userId(); // Get the current user's ID
  const owner = userId ? Meteor.users.findOne(userId)?.username : '';
  // const owner = _.pluck(Profiles.collection.find({ owner: username }).fetch(), 'owner');
  console.log(`userID: ${userId}, owner: ${owner}`);

  // There is a potential race condition. We might not be ready at this point.
  // Need to ensure that getProfileData doesn't throw an error on line 18.
  const profile = getProfileData(owner);
  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>My Profile</h2>
          </Col>
          <Row>
            <Col><Profile profile={profile} /></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ViewProfile;
