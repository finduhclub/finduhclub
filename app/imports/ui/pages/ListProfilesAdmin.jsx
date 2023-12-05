import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { Profiles } from '../../api/profiles/Profiles';
import { Clubs } from '../../api/clubs/Clubs';
import { ProfilesInterests } from '../../api/join/ProfilesInterests';
import { ProfilesClubs } from '../../api/join/ProfilesClubs';
import LoadingSpinner from '../components/LoadingSpinner';
import ProfileAdmin from '../components/ProfileAdmin';
import { getProfileData } from '../methods/methods.js';

/* Renders the Profile Collection as a set of Cards. */
const ListProfilesAdmin = () => {
  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Profiles.adminPublicationName);
    const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesClubs.userPublicationName);
    const sub4 = Meteor.subscribe(Clubs.adminPublicationName);
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
    };
  }, []);
  const owners = _.pluck(Profiles.collection.find().fetch(), 'owner');
  // There is a potential race condition. We might not be ready at this point.
  // Need to ensure that getProfileData doesn't throw an error on line 18.
  const profiles = owners.map(owner => getProfileData(owner));
  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Manage Profiles (Admin)</h2>
          </Col>
          <Row>
            {profiles.map((profile, index) => <Col key={index}><ProfileAdmin profile={profile} /></Col>)}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ListProfilesAdmin;
