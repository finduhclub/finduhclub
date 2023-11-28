import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import { Clubs } from '../../api/clubs/Clubs';
import { ProfilesInterests } from '../../api/join/ProfilesInterests';
import { ProfilesClubs } from '../../api/join/ProfilesClubs';
import { ClubsInterests } from '../../api/join/ClubsInterests';

/**
 * By defining and calling a Meteor Method, we can specify code to be run on the server-side but invoked by clients.
 * We don't need to use callbacks, because any errors are thrown and sent back to the client. Also, the restrictions
 * on the selectors are removed for server-side code.
 */

const updateProfileMethod = 'Profiles.update';

/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilesInterests, and ProfilesClubs collections to reflect the
 * updated situation specified by the user.
 */
Meteor.methods({
  'Profiles.update'({ owner, name, image, interests, clubs }) {
    Profiles.collection.update({ owner }, { $set: { name, image } });
    ProfilesInterests.collection.remove({ profile: owner });
    ProfilesClubs.collection.remove({ profile: owner });
    interests.map((interest) => ProfilesInterests.collection.insert({ profile: owner, interest }));
    clubs.map((club) => ProfilesClubs.collection.insert({ profile: owner, club }));
  },
});

const addClubMethod = 'Clubs.add';

/** Creates a new club in the Clubs collection, and also updates ProfilesClubs and ClubsInterests. */
Meteor.methods({
  'Clubs.add'({ name, clubType, image, description, clubTime, clubEmail, interests, participants }) {
    Clubs.collection.insert({ name, clubType, image, description, clubTime, clubEmail });
    ProfilesClubs.collection.remove({ project: name });
    ClubsInterests.collection.remove({ project: name });
    if (interests) {
      interests.map((interest) => ClubsInterests.collection.insert({ club: name, interest }));
    } else {
      throw new Meteor.Error('At least one interest is required.');
    }
    if (participants) {
      participants.map((participant) => ProfilesClubs.collection.insert({ club: name, profile: participant }));
    }
  },
});

export { updateProfileMethod, addClubMethod };
