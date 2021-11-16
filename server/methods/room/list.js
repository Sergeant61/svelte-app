import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'room.list',
  mixins: [RoleMixin],
  roles: ['permissions.room.read'],
  validate: new SimpleSchema({
    options: { type: QueryOptionsSchema, optional: true }
  }).validator(),
  run: function (data) {
    this.unblock();
    const { options } = data

    return FetchByIndex(Rooms, {}, options, null);
  }
});
