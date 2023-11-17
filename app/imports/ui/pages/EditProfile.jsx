import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';

const schema = new SimpleSchema({
  firstName: String,
});

const schemaLastName = new SimpleSchema({
  lastName: String,
});

const bridge = new SimpleSchema2Bridge(schema);
const bridge2 = new SimpleSchema2Bridge(schemaLastName);

/* Renders the EditStuff page for editing a single document. */
const EditProfile = () => {
  const submit = (data) => {
    const { firstName } = data;
    // const owner = Meteor.user().username;
    Meteor.users.update(
      Meteor.userId(),
      { $set: { 'profile.firstName': firstName } },
      (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')),
    );
  };
  const changeLastName = (data) => {
    const { lastName } = data;
    // const owner = Meteor.user().username;
    Meteor.users.update(
      Meteor.userId(),
      { $set: { 'profile.lastName': lastName } },
      (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')),
    );
  };

  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Profile</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="firstName" placeholder="first name" />
                <ErrorsField />
                <SubmitField value="Submit" />
              </Card.Body>
            </Card>
          </AutoForm>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge2} onSubmit={data => changeLastName(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="lastName" placeholder="Last name" />
                <ErrorsField />
                <SubmitField value="Submit" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
