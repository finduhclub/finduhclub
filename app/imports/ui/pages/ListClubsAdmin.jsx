import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Col, Container, FormSelect, Modal, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { Clubs } from '../../api/clubs/Clubs';
import ClubAdmin from '../components/ClubAdmin';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListClubsAdmin = () => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const { clubs, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Clubs.adminPublicationName);
    const subscription2 = Meteor.subscribe(Clubs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const rdy2 = subscription2.ready();
    // Get the Stuff documents
    let data = [];
    if (selectedFilter) {
      data = Clubs.collection.find({ interests: selectedFilter }).fetch();
    } else {
      data = Clubs.collection.find({}).fetch();
    }
    return {
      clubs: data,
      ready: rdy, rdy2,
    };
  }, [selectedFilter]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (ready ? (
    <Container id="list-clubs-admin" className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Manage Clubs (Admin)</h2>
          </Col>
          <Col md={1}>
            <Button variant="primary" onClick={handleShow}>
              Filter
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Select Filters</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormSelect id="filter-interests" onChange={handleFilterChange} value={selectedFilter || ''}>
                  <option value="">None</option>
                  <option value="Academic/Professional">Academic/Professional</option>
                  <option value="Ethnic/Cultural">Ethnic/Cultural</option>
                  <option value="Fraternity/Sorority">Fraternity/Sorority</option>
                  <option value="Honorary Society">Honorary Society</option>
                  <option value="Leisure/Recreational">Leisure/Recreational</option>
                  <option value="Political">Political</option>
                  <option value="Religious/Spiritual">Religious/Spiritual</option>
                  <option value="Service">Service</option>
                  <option value="Sports/Leisure">Sports/Leisure</option>
                  <option value="Student Affairs">Student Affairs</option>
                  <option value="Other">Other</option>
                </FormSelect>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4 flex-wrap mx-0 my-5">
        {clubs.map((club, index) => (
          <Col key={index} className="align-items-stretch">
            <ClubAdmin key={index} club={club} />
          </Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListClubsAdmin;
