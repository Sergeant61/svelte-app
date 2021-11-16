import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'message.create',
  mixins: [RoleMixin],
  roles: ['permissions.message.create'],
  validate: new SimpleSchema({
    message: MessageSchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { message } = data

    const id = Messages.insert(message);
    return Messages.findOne({ _id: id });
  }
});