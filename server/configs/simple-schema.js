import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform((error) => {
  const ddpError = new Meteor.Error('schema-error', error.message);
  ddpError.details = error.details;
  return ddpError;
});