import SimpleSchema from "simpl-schema";

Messages = new Mongo.Collection("messages");

MessageSchema = new SimpleSchema({
  name: String,

  roomId: SimpleSchema.RegEx.Id,

  description: {
    type: String,
    optional: true,
  },
});

Messages.attachSchema(MessageSchema);
Messages.softRemovable();
Messages.autoDates();
Messages.lastEditUser();
Messages.createdUser();
Messages.nonDeletable();