import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'user.create',
  // mixins: [RoleMixin],
  // roles: ['permissions.user.create'],
  validate: new SimpleSchema({
    emailAddress: String,
    password: String,
    profile: { type: Object, blackbox: true },
  }).validator(),
  run: function (data) {
    this.unblock();
    const { emailAddress, password, profile, roleIds, personnelId } = data

    const userId = Accounts.createUser({
      email: emailAddress,
      password: password,
      profile: profile
    });

    Roles.addUsersToRoles(userId, 'roles.user', null);
  }
});



