import React, { useState } from 'react';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Renders the EditStuff page for editing a single document. */
const ChangePassword = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schemaUpdatePassword = new SimpleSchema({
    oldPassword: String,
    newPassword: String,
  });

  const bridge3 = new SimpleSchema2Bridge(schemaUpdatePassword);
  const updatePassword = (data) => {
    const { oldPassword, newPassword } = data;
    Accounts.changePassword(
      oldPassword,
      newPassword,
      (errors) => {
        if (errors) {
          setError(errors.reason);
        } else {
          setError('');
          setRedirectToRef(true);
        }
      },
    );
  };

  const { from } = location?.state || { from: { pathname: '/profile' } };
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Change Password</h2></Col>
          <AutoForm schema={bridge3} onSubmit={data => updatePassword(data)}>
            <Card>
              <Card.Header>Change password</Card.Header>
              <Card.Body>
                <TextField name="oldPassword" placeholder="Old Password" type="password" />
                <TextField name="newPassword" placeholder="New Password" type="password" />
                <ErrorsField />
                <SubmitField value="Submit" />
              </Card.Body>
            </Card>
          </AutoForm>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Password change was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

ChangePassword.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

ChangePassword.defaultProps = {
  location: { state: '' },
};

export default ChangePassword;
