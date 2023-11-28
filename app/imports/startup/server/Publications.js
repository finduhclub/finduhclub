import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Profiles } from '../../api/profiles/Profiles';
import { Clubs } from '../../api/clubs/Clubs';
import { Interests } from '../../api/interests/Interests';
import { ProfilesInterests } from '../../api/join/ProfilesInterests';
import { ProfilesClubs } from '../../api/join/ProfilesClubs';
import { ClubsInterests } from '../../api/join/ClubsInterests';

// All users publication.
// Publishes all documents regardless of status.
Meteor.publish(Interests.userPublicationName, () => Interests.collection.find());
Meteor.publish(ProfilesInterests.userPublicationName, () => ProfilesInterests.collection.find());
Meteor.publish(ProfilesClubs.userPublicationName, () => ProfilesClubs.collection.find());
Meteor.publish(ClubsInterests.userPublicationName, () => ClubsInterests.collection.find());

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});
// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Clubs.userPublicationName, function () {
  if (this.userId) {
    return Clubs.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});
Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(Clubs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Clubs.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
