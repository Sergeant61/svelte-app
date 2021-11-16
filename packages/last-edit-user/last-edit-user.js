export const name = 'last-edit-user';
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
  'simpl-schema': '1.10.2'
}, 'bordo:last-edit-user');

const SimpleSchema = require('simpl-schema');

const _schema = new SimpleSchema({
  lastEditUserId: {
    type: SimpleSchema.RegEx.Id,
    autoValue: function () {
      try {
        if (Meteor.userId()) {
          return Meteor.userId()
        }
      } catch (error) {
        console.log('Data was recorded without user registration.');
        console.log('<===========================================');
        console.log(this);
        console.log('===========================================>');
      }
    },
    optional: true
  }
});

Mongo.Collection.prototype.lastEditUser = function () {
  const collection = this;
  collection.attachSchema(_schema);
};
