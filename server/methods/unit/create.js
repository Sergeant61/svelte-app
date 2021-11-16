import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'unit.create',
  mixins: [RoleMixin],
  roles: ['permissions.unit.create'],
  validate: new SimpleSchema({
    unit: UnitSchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { unit } = data

    const id = Units.insert(unit);
    return Units.findOne({ _id: id });
  }
});