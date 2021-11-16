Meteor.publish(null, function () {
  return Meteor.users.find({ _id: this.userId }, {
    fields: {
      emails: 1,
      profile: 1,
      personnelId: 1,
      status: 1,
      fmcTokens: 1,
    }
  });
});

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  } else {
    this.ready()
  }
});