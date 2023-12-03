import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Button, Modal } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import LoadingSpinner from '../components/LoadingSpinner';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Clubs } from '../../api/clubs/Clubs';
import Club from '../components/Club';
import { Interests } from '../../api/interests/Interests';
import { AutoForm, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { useStickyState } from '../util/StickyState';
import { ClubsInterests } from '../../api/join/ClubsInterests';
import * as clubInterestsLists from 'underscore';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListStuff = () => {
  const makeSchema = (allInterests) => new SimpleSchema({
    interests: { type: Array, label: 'Interests', optional: true},
    'interests.$': { type: String, allowedValues: allInterests },
  });
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const [interests, setInterests] = useStickyState('interests', []);
  const { ready, clubs, clubInterests, clubInterestsList } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Clubs.adminPublicationName);
    const subscription2 = Meteor.subscribe(Clubs.userPublicationName);
    const subscription3 = Meteor.subscribe(Interests.userPublicationName);
    const subscription4 = Meteor.subscribe(ClubsInterests.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const rdy2 = subscription2.ready();
    const rdy3 = subscription3.ready();
    const rdy4 = subscription4.ready();
    // Get the Stuff documents
    const clubItems = Clubs.collection.find().fetch();
    const interestsList = Interests.collection.find().fetch();
    const clubListInterests = ClubsInterests.collection.find().fetch();
    return {
      clubs: clubItems,
      clubInterests: interestsList,
      clubInterestsList: clubListInterests,
      ready: rdy, rdy2, rdy3, rdy4,
    };
  }, []);
  const submit = (data) => {
    setInterests(data.interests || []);
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function chunkArray(arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
  }

  function getClubData(clubName) {
    const data = Clubs.collection.findOne({ clubName });
    return data;
  }

  const allInterests = _.pluck(clubInterests, 'name');
  const formSchema = makeSchema(allInterests);
  const bridge = new SimpleSchema2Bridge(formSchema);
  const clubsWithInterests = clubInterestsLists.filter(cI => interests.include(cI.interest));
  console.log(clubsWithInterests);
  const clubNames = _.pluck(clubsWithInterests, 'name');
  console.log(clubNames);
  const clubData = _.uniq(clubNames).map(clubName => getClubData(clubName));
  const transform = (label) => ` ${label}`;
  return (ready ? (
    <Container id="list-clubs" fluid className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Clubs</h2>
          </Col>
          <Row xs={1} md={2} lg={4} className="g-2">
            {clubData.map((clubs, index) => <Club key={index} club={clubs}/>)}
          </Row>
          {/*{chunkArray(clubs, 3).map((row, rowIndex) => (
            <Row key={rowIndex} className="pb-4">
              {row.map((clubs, colIndex) => (
                <Col key={colIndex} xs={4}>
                  <Club club={clubs} />
                </Col>
              ))}
            </Row>
          ))}*/}
        </Col>
      </Row>
      <hr />
      <Row className="justify-content-end">
        <Col md={11}>
          <Button variant="outline-secondary" className="px-4">Search</Button>
        </Col>
        <Col md={1}>
          <Button variant="primary" onClick={handleShow}>
            Filter
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Select Filters</Modal.Title>
            </Modal.Header>
            <AutoForm schema={bridge} onSumbit={data => submit(data)} model={{ interests }}>
              <Modal.Body>
                <SelectField name="interests" multiple placeholder="Interests" checkboxes transform={transform} />
              </Modal.Body>
              <Modal.Footer>
                <SubmitField id="filter-submit-field" value="Submit" />
              </Modal.Footer>
            </AutoForm>
          </Modal>
        </Col>
      </Row>
      <hr />
    </Container>
  ) : <LoadingSpinner />);
};

export default ListStuff;
