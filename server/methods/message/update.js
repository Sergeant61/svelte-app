import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'message.update',
  mixins: [RoleMixin],
  roles: ['permissions.message.update'],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    message: MessageSchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id, message } = data

    const id = Messages.update({ _id: _id }, {
      $set: message
    });

    return Messages.findOne({ _id: id });
  }
});







