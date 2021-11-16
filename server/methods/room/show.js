import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'room.show',
  mixins: [RoleMixin],
  roles: ['permissions.room.read'],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    return Rooms.findOne({
      _id: _id
    });
  }
});


