import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
// import { array } from 'prop-types';

/**
 * ClubsCollection, contains collection attributes and schema.
 */
class ClubsCollection {
  constructor() {
    // Define clubs collection and schema
    this.name = 'ClubsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      clubName: String,
      clubType: String,
      clubImage: String,
      clubDescription: String,
      clubTime: String,
      clubEmail: String,
      _id: String,
    });
    // Make sure each club adheres to specified schema
    this.collection.attachSchema(this.schema);
    // Set names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * ClubsCollection instance
 * @type {ClubsCollection}
 */
export const Clubs = new ClubsCollection();
