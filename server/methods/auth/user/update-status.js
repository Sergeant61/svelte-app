import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'user.updateStatus',
  mixins: [RoleMixin],
  roles: ['permissions.user.update'],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id } = data

    const user = Meteor.users.findOne({ _id: _id });

    if (!user) {
      // TODO ERROR
      return;
    }

    let status = ''
    if (user.profile.status == 'active') {
      status = 'deactive';
    } else {
      status = 'active';
    }

    Meteor.users.update({ _id: user._id }, {
      $set: {
        'profile.status': status,
      }
    })
  }
});



