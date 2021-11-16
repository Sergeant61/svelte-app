import { router } from "tinro";

Accounts.onResetPasswordLink(function (token, done) {
  router.goto(`/auth/forgot-password-verify?token=${token}`);
});

Accounts.onEnrollmentLink(function (token, done) {
  router.goto(`/auth/set-password?token=${token}`);
});

Accounts.onEmailVerificationLink(function (token, done) {
  router.goto(`/auth/verify-email?token=${token}`);
});