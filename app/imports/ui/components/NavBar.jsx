import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  const { userId } = useTracker(() => ({
    userId: Meteor.userId() ? Meteor.userId() : '',
  }));

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {currentUser ? (
          <Navbar.Brand as={NavLink} to="/home" className="d-flex align-items-center">
            <img src="/images/find-uh-clubs-logo.png" alt="uh-logo" height={50} />
          </Navbar.Brand>
        ) : (
          <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
            <img src="/images/find-uh-clubs-logo.png" alt="uh-logo" height={50} />
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? ([
              <Nav.Link id="list-clubs-nav" as={NavLink} to="/list" key="list">View Clubs</Nav.Link>,
              <Nav.Link id="list-profile-nav" as={NavLink} to="/profile" key="list">View Profile</Nav.Link>,
              <Nav.Link id="edit-profile-nav" as={NavLink} to={`/profile/edit/${userId}`} key="edit">Edit Profile</Nav.Link>,
            ]) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
              <Nav.Link id="add-clubs-nav" as={NavLink} to="/add" key="add">Add Clubs</Nav.Link>,
              <Nav.Link id="manage-profiles-admin-nav" as={NavLink} to="/profileAdmin" key="admin">Manage Profiles</Nav.Link>,
              <Nav.Link id="manage-clubs-admin-nav" as={NavLink} to="/clubAdmin" key="clubAdmin">Manage Clubs</Nav.Link>,
            ]) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login" className="me-3">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="navbar-current-user" title={currentUser}>
                <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
