import { UserStatus } from 'meteor/mizzao:user-status';

Accounts.onCreateUser(function (options, user) {
  user.profile = options.profile || {};
  user.profile.status = 'active';
  user.profile.isAdmin = false;

  // Roles.addUsersToRoles(user._id, ['roles.user'], null);
  return user;
});

Accounts.validateLoginAttempt(function (options) {
  const { allowed, error, user } = options

  if (!allowed && error) {
    throw error;
  } else if (!user) {
    throw new Meteor.Error(403, "Invalid Email or Password");
  } else if (user.profile.status != 'active') {
    throw new Meteor.Error(403, "Your Account Deactive");
  }

  return true;
})

Accounts.emailTemplates.from = Meteor.settings?.email?.from || '';

UserStatus.events.on('connectionLogin', function (fields) {
  fields.type = 'login';
  UserStatusLogs.insert(fields);
});

// Accounts.emailTemplates.enrollAccount.subject = (user) => {
//   return i18n.__('emails.enrollment.subject', { fullname: user.profile.fullname });
// };

// Accounts.emailTemplates.enrollAccount.html = (user, url) => {
//   return SSR.render('enrollment', { rootUrl: Meteor.settings.rootUrl, url: url, user: user })
// };

// Accounts.emailTemplates.resetPassword.subject = (user) => {
//   return i18n.__('emails.resetPassword.subject', { fullname: user.profile.fullname });
// };

// Accounts.emailTemplates.resetPassword.html = (user, url) => {
//   return SSR.render('resetPassword', { rootUrl: Meteor.settings.rootUrl, url: url, user: user })
// };