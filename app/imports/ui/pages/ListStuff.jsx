import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Button, Modal, Form } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Clubs } from '../../api/clubs/Clubs';
import Club from '../components/Club';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListStuff = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, clubs } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Clubs.adminPublicationName);
    const subscription2 = Meteor.subscribe(Clubs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const rdy2 = subscription2.ready();
    // Get the Stuff documents
    const clubItems = Clubs.collection.find().fetch();
    return {
      clubs: clubItems,
      ready: rdy, rdy2,
    };
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function chunkArray(arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
  }

  return (ready ? (
    <Container fluid className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Clubs</h2>
          </Col>
          {chunkArray(clubs, 3).map((row, rowIndex) => (
            <Row key={rowIndex} className="pb-4">
              {row.map((club, colIndex) => (
                <Col key={colIndex} xs={4}>
                  <Club club={club} />
                </Col>
              ))}
            </Row>
          ))}
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
            <Modal.Body>
              <Form>
                {['checkbox'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Religious/Spiritual"
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="Honorary Society"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                    />
                    <Form.Check
                      inline
                      label="Service"
                      type={type}
                      id={`inline-${type}-3`}
                    />
                    <Form.Check
                      inline
                      label="Student Affairs"
                      type={type}
                      id={`inline-${type}-4`}
                    />
                    <Form.Check
                      inline
                      label="Leisure/Recreational"
                      type={type}
                      id={`inline-${type}-5`}
                    />
                    <Form.Check
                      inline
                      label="Academic/Professional"
                      type={type}
                      id={`inline-${type}-6`}
                    />
                    <Form.Check
                      inline
                      label="Fraternity/Sorority"
                      type={type}
                      id={`inline-${type}-7`}
                    />
                    <Form.Check
                      inline
                      label="Ethnic/Cultural"
                      type={type}
                      id={`inline-${type}-8`}
                    />
                    <Form.Check
                      inline
                      label="Sports/Leisure"
                      type={type}
                      id={`inline-${type}-9`}
                    />
                  </div>
                ))}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Filters
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <hr />
    </Container>
  ) : <LoadingSpinner />);
};

export default ListStuff;
