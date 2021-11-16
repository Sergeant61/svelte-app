import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'user.create',
  mixins: [RoleMixin],
  roles: ['permissions.user.create'],
  validate: new SimpleSchema({
    personnelId: SimpleSchema.RegEx.Id,
    emailAddress: String,
    password: String,
    profile: { type: Object, blackbox: true },
    roleIds: Array,
    'roleIds.$': String
  }).validator(),
  run: function (data) {
    this.unblock();
    const { emailAddress, password, profile, roleIds, personnelId } = data

    const userId = Accounts.createUser({
      email: emailAddress,
      password: password,
      profile: profile
    });

    Meteor.users.update({ _id: userId }, {
      $set: {
        personnelId: personnelId,
      }
    })

    Roles.addUsersToRoles(userId, roleIds, null);
  }
});



