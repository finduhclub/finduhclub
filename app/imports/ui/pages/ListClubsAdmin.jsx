import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { Clubs } from '../../api/clubs/Clubs';
import ClubAdmin from '../components/ClubAdmin';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListClubsAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { clubs, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Clubs.adminPublicationName);
    const subscription2 = Meteor.subscribe(Clubs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const rdy2 = subscription2.ready();
    // Get the Stuff documents
    const clubsItems = Clubs.collection.find().fetch();
    return {
      clubs: clubsItems,
      ready: rdy, rdy2,
    };
  }, []);

  function chunkArray(arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
  }

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Clubs</h2>
          </Col>
          {chunkArray(clubs, 3).map((row, rowIndex) => (
            <Row key={rowIndex} className="pb-4">
              {row.map((club, colIndex) => (
                <Col key={colIndex} xs={4}>
                  <ClubAdmin club={club} />
                </Col>
              ))}
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListClubsAdmin;
