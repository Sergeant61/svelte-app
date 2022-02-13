import query from 'array-query';
import { ErrorHandler } from '../../error-handler/error-handler';

VerifiedMixin = function (methodOptions) {
  const runFunc = methodOptions.run;

  methodOptions.run = function () {
    const user = Meteor.user();

    if (!user) {
      return;
    }

    const notVerified = query('verified').is(true).on(user.emails).length == 0

    if (notVerified) {
      ErrorHandler.set('not-verified', i18n.__('auth', 'notVerified'));
    }

    return runFunc.call(this, ...arguments);
  }

  return methodOptions;
}