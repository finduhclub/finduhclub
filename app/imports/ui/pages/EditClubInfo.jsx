import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Clubs } from '../../api/clubs/Clubs';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Clubs.schema);

/* Renders the EditClubInfo page for editing a single document. */
const EditClubInfo = () => {
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Club documents.
    const subscription = Meteor.subscribe(Clubs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Clubs.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  const submit = (data) => {
    const { clubName, clubType, clubImage, clubDescription, clubTime, clubEmail } = data;
    Clubs.collection.update(_id, { $set: { clubName, clubType, clubImage, clubDescription, clubTime, clubEmail } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Club Info</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col> <TextField name="name" /> </Col>
                  <Col> <SelectField name="type" /> </Col>
                </Row>
                <Row>
                  <Col> <TextField name="image" /> </Col>
                  <Col> <LongTextField name="description" /> </Col>
                </Row>
                <Row>
                  <Col> <TextField name="meeting times" /> </Col>
                  <Col> <TextField name="contact" /> </Col>
                </Row>
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditClubInfo;
