import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Clubs } from '../../api/clubs/Clubs';

// Define the allowed values for interests (i.e. Club types).
const ClubTypes = [
  'Academic/Professional', 'Ethnic/Cultural', 'Fraternity/Sorority', 'Honorary Society', 'Leisure/Recreational', 'Political', 'Religious/Spiritual', 'Service', 'Sports/Leisure', 'Student Affairs', 'Other',
];

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  image: String,
  description: String,
  clubTime: String,
  clubEmail: String,
  interests: Array,
  'interests.$': {
    type: String,
    allowedValues: ClubTypes,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddClubs page for adding a document. */
const AddClubs = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, image, description, clubTime, clubEmail, interests } = data;
    const owner = Meteor.user().username;
    Clubs.collection.insert(
      { name, image, description, clubTime, clubEmail, interests, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id="add-clubs" className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Club</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField id="add-clubs-name-field" name="name" />
                <TextField id="add-clubs-image-field" name="image" />
                <TextField id="add-clubs-desc-field" name="description" />
                <TextField id="add-clubs-time-field" name="clubTime" />
                <TextField id="add-clubs-email-field" name="clubEmail" />
                <SelectField id="add-clubs-interests-field" multiple checkboxes name="interests" />
                <SubmitField id="add-clubs-submit-btn" value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddClubs;
