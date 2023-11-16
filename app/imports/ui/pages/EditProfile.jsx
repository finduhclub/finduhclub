import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

/* Renders the EditStuff page for editing a single document. */
const EditProfile = () => {
  const schema = new SimpleSchema({
    firstName: String,
    LastName: String,
  });

  const bridge = new SimpleSchema2Bridge(schema);
  const currentUser = Meteor.user();
  const submit = (newName) => {
    const { firstName, lastName } = newName;
    Meteor.users.update({ profile: { firstName: firstName, lastName: lastName } });
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="firstName" placeholder={currentUser.profile.firstName} />
                <TextField name="lastName" placeholder={currentUser.profile.lastName} />
                <ErrorsField />
                <SubmitField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
