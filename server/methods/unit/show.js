import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'unit.show',
  mixins: [RoleMixin],
  roles: ['permissions.unit.read'],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    return Units.findOne({
      _id: _id
    });
  }
});


