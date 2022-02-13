import { ErrorHandler } from "../../error-handler/error-handler";

RoleMixin = function (methodOptions) {
  const roles = methodOptions.roles;
  const runFunc = methodOptions.run;

  methodOptions.run = function (_data) {
    const userId = this.userId;

    if (!userId) {
      console.log(methodOptions.name);
      ErrorHandler.set('unauthorized', i18n.__('utils', 'signedInMixinError'));
    }

    const isInRole = Roles.userIsInRole(userId, roles);

    if (!isInRole) {
      console.log(methodOptions.name);
      ErrorHandler.set('forbidden', i18n.__('utils', 'roleMixinError'));
    }

    return runFunc.call(this, ...arguments);
  }
  return methodOptions;
}