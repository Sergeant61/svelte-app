// import Meteor from 'meteor/meteor';
// Meteor.publish('messages.list', function (roomId) {
//   if (this.userId) {
//     return Messages.find({ roomId: roomId });
//   } else {
//     this.ready()
//   }
// });

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

          console.log(message);
          if (message) {
            return Meteor.users.find({ _id: message.userId }, { fields: { services: 0 } });
          }
        }
      }
    ]
  }
});