publishComposite('messages.list', function (roomId) {
  return {
    find() {
      this.unblock();
      if (!this.userId) {
        this.ready();
      }

      return Messages.find({ roomId: roomId });
    },

    children: [
      {
        find(message) {
          this.unblock();

          if (message) {
            return Meteor.users.find({ _id: message.userId }, { fields: { services: 0 } });
          }
        }
      }
    ]
  }
});