import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'unit.delete',
  mixins: [RoleMixin],
  roles: ['permissions.unit.delete'],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    Units.softRemove({ _id: _id });
  }
});




