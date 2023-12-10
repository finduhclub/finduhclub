import React from 'react';
import { AutoForm, TextField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import { Container, Col, Card, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { Clubs } from '../../api/clubs/Clubs';
import { ProfilesClubs } from '../../api/join/ProfilesClubs';
import { ProfilesInterests } from '../../api/join/ProfilesInterests';
import { updateProfileMethod } from '../../startup/both/Methods';

/* Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests, allClubs) => new SimpleSchema({
  owner: { type: String, label: 'Email', optional: true },
  name: { type: String, label: 'Name', optional: true },
  image: { type: String, label: 'Picture URL', optional: true },
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
  clubs: { type: Array, label: 'Clubs', optional: true },
  'clubs.$': { type: String, allowedValues: allClubs },
});

/* Renders the EditProfile Page: what appears after the user logs in. */
const EditProfile = () => {

  /* On submit, insert the data. */
  const submit = (data) => {
    Meteor.call(updateProfileMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
      }
    });
  };

  const { ready, owner } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Interests.userPublicationName);
    const sub2 = Meteor.subscribe(Profiles.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesInterests.userPublicationName);
    const sub4 = Meteor.subscribe(ProfilesClubs.userPublicationName);
    const sub5 = Meteor.subscribe(Clubs.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
      owner: Meteor.user()?.username,
    };
  }, []);
  // Create the form schema for uniforms. Need to determine all interests and clubs for muliselect list.
  const allInterests = _.pluck(Interests.collection.find().fetch(), 'name');
  const allClubs = _.pluck(Clubs.collection.find().fetch(), 'name');
  const formSchema = makeSchema(allInterests, allClubs);
  const bridge = new SimpleSchema2Bridge(formSchema);
  // Now create the model with all the user information.
  const clubs = _.pluck(ProfilesClubs.collection.find({ profile: owner }).fetch(), 'club');
  const interests = _.pluck(ProfilesInterests.collection.find({ profile: owner }).fetch(), 'interest');
  const profile = Profiles.collection.findOne({ owner });
  const model = _.extend({}, profile, { interests, clubs });
  // console.log(`Model: ${JSON.stringify(model)}`);
  return ready ? (
    <Container id="edit-profile" className="justify-content-center">
      <Col>
        <Col className="justify-content-center text-center"><h2>Your Profile</h2></Col>
        <AutoForm model={model} schema={bridge} onSubmit={data => submit(data)}>
          <Card>
            <Card.Body>
              <Row className="justify-content-evenly">
                <Col xs={6}><TextField id="edit-profile-name-field" name="name" showInlineError placeholder="Display Name" /></Col>
                <Col xs={6}><TextField id="edit-profile-owner-field" name="owner" showInlineError placeholder="Email" disabled /></Col>
              </Row>
              <Row>
                <Col xs={6}><TextField id="edit-profile-image-field" name="image" showInlineError placeholder="URL to image" /></Col>
                <Col xs={6}>Default Image Options:
                  <Row>
                    <Col className="text-center small">
                      <img className="pfp-preview" src="/images/pb.jpg" alt="default pfp" />
                      /images/pb.jpg
                    </Col>
                    <Col className="text-center small">
                      <img className="pfp-preview" src="/images/cat.jpg" alt="default pfp" />
                      /images/cat.jpg
                    </Col>
                    <Col className="text-center small">
                      <img className="pfp-preview" src="/images/bear.jpg" alt="default pfp" />
                      /images/bear.jpg
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col xs={6}><SelectField id="edit-profile-interests-field" name="interests" showInlineError multiple /></Col>
                <Col xs={6}><SelectField id="edit-profile-clubs-field" name="clubs" showInlineError multiple /></Col>
              </Row>
              <SubmitField id="edit-profile-update" value="Update" />
            </Card.Body>
          </Card>
        </AutoForm>
      </Col>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditProfile;
