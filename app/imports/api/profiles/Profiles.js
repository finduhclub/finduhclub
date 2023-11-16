import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ProfilesCollection. It encapsulates state and variable values for a user's profile.
 */
class ProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);

    // Define the allowed values for interests (i.e. Club types).
    const ClubTypes = [
      'Academic/Professional', 'Ethnic/Cultural', 'Fraternity/Sorority', 'Honorary Society', 'Leisure/Recreational', 'Political', 'Religious/Spiritual', 'Service', 'Sports/Leisure', 'Student Affairs', 'Other',
    ];

    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      ownerID: String,
      username: String,
      image: String,
      membership: {
        type: String,
        defaultValue: 'None',
      },
      interests: Array,
      'interests.$': {
        type: String,
        allowedValues: ClubTypes,
      },
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ProfilesCollection.
 * @type {ProfilesCollection}
 */
export const Profiles = new ProfilesCollection();
