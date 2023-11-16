import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import ProfileAdmin from '../components/ProfileAdmin';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListProfilesAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { profiles, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const people = Profiles.collection.find().fetch();
    return {
      profiles: people,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Profiles (Admin)</h2>
          </Col>
          <Row>
            {profiles.map((profile, index) => <Col key={index}><ProfileAdmin profile={profile} /></Col>)}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListProfilesAdmin;
