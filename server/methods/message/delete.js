import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'message.delete',
  mixins: [RoleMixin],
  roles: ['permissions.message.delete'],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    Messages.softRemove({ _id: _id });
  }
});




