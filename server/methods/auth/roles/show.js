import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'roles.show',
  mixins: [SignedInMixin],
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id } = data;
    return Meteor.roles.findOne({ _id: { $regex: /^roles\./ }, _id: _id });
  }
});
