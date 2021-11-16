import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'users.roles.list',
  mixins: [RoleMixin],
  roles: ['permissions.user.read'],
  validate: new SimpleSchema({
    userId: { type: SimpleSchema.RegEx.Id }
  }).validator(),
  run: function (data) {
    this.unblock();
    const { userId } = data

    return ActionGetUserRoles(userId);
  }
});