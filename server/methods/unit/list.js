import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'unit.list',
  mixins: [RoleMixin],
  roles: ['permissions.unit.read'],
  validate: new SimpleSchema({
    options: { type: QueryOptionsSchema, optional: true }
  }).validator(),
  run: function (data) {
    this.unblock();
    const { options } = data

    return FetchByIndex(Units, {}, options, UnitsIndex);
  }
});
