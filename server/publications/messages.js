Meteor.publish('messages.list', function (roomId) {
  if (this.userId) {
    return Messages.find({ roomId: roomId });
  } else {
    this.ready()
  }
});