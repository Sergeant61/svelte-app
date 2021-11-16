import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'user.update',
  mixins: [RoleMixin],
  roles: ['permissions.user.update'],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    emailAddress: String,
    password: { type: String, optional: true },
    profile: { type: Object, blackbox: true },
    roleIds: Array,
    'roleIds.$': String
  }).validator(),
  run: function (data) {
    this.unblock();
    const { emailAddress, password, profile, roleIds, _id } = data;

    const user = Meteor.users.findOne({ _id: _id });

    if (emailAddress != user.emails[0].address) {
      Accounts.addEmail(_id, emailAddress, true);
      Accounts.removeEmail(_id, user.emails[0].address);
    }

    if (password) {
      Accounts.setPassword(_id, password);
    }

    Meteor.users.update({ _id: _id }, {
      $set: {
        'profile.firstName': profile.firstName,
        'profile.lastName': profile.lastName
      }
    })

    const _roleIds = Roles.getRolesForUser(_id);
    Roles.removeUsersFromRoles(_id, _roleIds);
    Roles.addUsersToRoles(_id, roleIds);
  }
});



