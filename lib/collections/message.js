import SimpleSchema from "simpl-schema";

Messages = new Mongo.Collection("messages");

MessageSchema = new SimpleSchema({
  text: String,

  roomId: SimpleSchema.RegEx.Id,

  userId: SimpleSchema.RegEx.Id,
});

Messages.attachSchema(MessageSchema);
Messages.softRemovable();
Messages.autoDates();
Messages.lastEditUser();
Messages.createdUser();
Messages.nonDeletable();

Messages.helpers({
  user: function() {
    return Meteor.users.findOne({_id: this.userId});
  }
});

export default Messages;