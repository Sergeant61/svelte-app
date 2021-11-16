import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'unit.update',
  mixins: [RoleMixin],
  roles: ['permissions.unit.update'],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    unit: UnitSchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id, unit } = data

    const id = Units.update({ _id: _id }, {
      $set: unit
    });

    return Units.findOne({ _id: id });
  }
});







