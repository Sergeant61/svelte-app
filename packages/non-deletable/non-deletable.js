export const name = 'soft-remove';
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
  'simpl-schema': '1.10.2',
  'slugify': '1.4.6'
}, 'bordo:non-deletable');

const slugify = require('slugify');
const SimpleSchema = require('simpl-schema');

const _schema = new SimpleSchema({
  nonDeletable:{
    type:Boolean,
    optional:true
  }
});

const _beforeRemoveHook = function(_userId, _doc) {
  if (_doc.nonDeletable) {
    throw new Meteor.Error('schema-error', 'Bu kayıt silinemez !!!');
  }
};

Mongo.Collection.prototype.nonDeletable = function() {
  const collection = this;
  collection.attachSchema(_schema);

  collection.before.remove(_beforeRemoveHook);
};