import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'room.list',
  mixins: [RoleMixin],
  roles: ['permissions.room.read'],
  validate: new SimpleSchema({
    options: QueryOptionsSchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { options } = data

    console.log(options);
    return FetchByIndex(Rooms, {}, options, null);
  }
});
