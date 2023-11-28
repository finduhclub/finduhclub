import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/join/ProfilesInterests';
import { ProfilesClubs } from '../../api/join/ProfilesClubs';

/* A file containing methods used in the rendering of ui */

/* Returns the Profile and associated Clubs and Interests associated with the passed user email. */
export function getProfileData(owner) {
  const data = Profiles.collection.findOne({ owner });
  const interests = _.pluck(ProfilesInterests.collection.find({ profile: owner }).fetch(), 'interest');
  const clubs = _.pluck(ProfilesClubs.collection.find({ profile: owner }).fetch(), 'club');
  console.log(_.extend({ }, data, { interests, clubs }));
  return _.extend({}, data, { interests, clubs });
}
