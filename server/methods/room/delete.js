import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'room.delete',
  mixins: [RoleMixin],
  roles: ['permissions.room.delete'],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    Rooms.softRemove({ _id: _id });
  }
});




