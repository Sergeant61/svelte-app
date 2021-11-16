import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'message.show',
  mixins: [RoleMixin],
  roles: ['permissions.message.read'],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    return Messages.findOne({
      _id: _id
    });
  }
});


