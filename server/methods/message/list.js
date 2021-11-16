import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'message.list',
  mixins: [RoleMixin],
  roles: ['permissions.message.read'],
  validate: new SimpleSchema({
    options: { type: QueryOptionsSchema, optional: true }
  }).validator(),
  run: function (data) {
    this.unblock();
    const { options } = data

    return FetchByIndex(Messages, {}, options, null);
  }
});
