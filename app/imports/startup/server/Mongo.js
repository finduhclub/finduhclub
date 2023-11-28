import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Profiles } from '../../api/profiles/Profiles.js';
import { Interests } from '../../api/interests/Interests.js';
import { ProfilesInterests } from '../../api/join/ProfilesInterests.js';
import { ProfilesClubs } from '../../api/join/ProfilesClubs.js';
import { Clubs } from '../../api/clubs/Clubs.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name}`);
  Interests.collection.insert(data);
};

// Initialize the InterestsCollection if empty.
if (Interests.collection.find().count() === 0) {
  if (Meteor.settings.defaultInterests) {
    console.log('Creating default interests.');
    Meteor.settings.defaultInterests.forEach(data => addData(data));
  }
}

// Initialize the database with a default data document.
const addStuffData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addStuffData(data));
  }
}

// Initialize the database with a default data document.
const addProfileData = (data) => {
  console.log(`  Adding: ${data.username}`);
  Profiles.collection.insert(data);
};

// Initialize the ProfilesCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.forEach(data => addProfileData(data));
  }
}

const addClubData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Clubs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Clubs.collection.find().count() === 0) {
  if (Meteor.settings.defaultClubs) {
    console.log('Creating default clubs.');
    Meteor.settings.defaultClubs.forEach(data => addClubData(data));
  }
}

/** Defines an associated profile for a user. Error if user already exists. */
function addProfile({ ownerID, username, image, interests, clubs }) {
  console.log(`Defining profile ${ownerID}`);
  // Create the profile.
  Profiles.collection.insert({ ownerID, username, image });
  // Add interests and projects.
  interests.map(interest => ProfilesInterests.collection.insert({ profile: ownerID, interest }));
  clubs.map(club => ProfilesClubs.collection.insert({ profile: ownerID, club }));
}
