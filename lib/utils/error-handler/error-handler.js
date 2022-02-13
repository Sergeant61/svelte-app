import Swal from 'sweetalert2';
import { Translate } from '/lib/configs/i18n.js';
import { router } from "tinro";

export const ErrorHandler = {
  set: function (_error, _message, _throwError = true) {
    const createdError = new Meteor.Error(_error, Accounts._options.ambiguousErrorMessages ? "Something went wrong. Please check your credentials." : _message);

    if (typeof _error === 'object' && _error.writeErrors) {
      ErrorHandler.mongoError(createdError, _error);
    }

    if (_throwError) {
      throw createdError;
    }

    return createdError;
  },

  mongoError: function (error, _error) {
    switch (_error.code) {
      case 11000:
        _error.writeErrors.forEach(we => {
          const s = we.err.errmsg.indexOf("{") + 2;
          const e = we.err.errmsg.lastIndexOf(":");

          error.error = 422;
          error.reason = {};
          error.reason = { errors: {} };
          error.reason.errors[we.err.errmsg.slice(s, e)] = "Bu alan benzersiz olmalı.";
        });
        break;
    }
  },

  show: function (error, template) {
    console.log(error, template);
    let message;

    if (typeof error === 'string') {
      message = error;
    } else {
      message = error.reason;
    }

    if (typeof error === 'object') {

      if (error.error === 'not-verified') {
        Swal.fire({
          title: Translate('globals.swal', 'verifyTitle'),
          text: error.reason,
          icon: 'warning',
          showCancelButton: true,
          showConfirmButton: true,
          cancelButtonText: Translate('globals', 'ok'),
          confirmButtonText: Translate('globals.swal', 'sendVerification')
        }).then((value) => {
          if (!value.isConfirmed) {
            return;
          }

          Meteor.call('auth.resendVerification', function (error, _result) {
            Swal.fire({
              title: Translate('globals.swal', 'verificationSentTitle'),
              text: Translate('globals.swal', 'verificationSentDescription'),
              icon: 'success',
              showConfirmButton: true,
              confirmButtonText: Translate('globals', 'ok'),
            }).then((value) => {
              router.goto('/');
            });
          });
        });

        return;
      } else if (error.error == 422 && template) {
        const errors = error.reason.errors;

        Object.keys(errors).forEach(function (key) {
          const elements = template.$(`input[key='${key}']`);

          if (elements.length > 0) {
            elements.addClass('is-invalid');
            const label = elements.siblings('label');
            label.attr('data-content', ` * (${errors[key]})`);
          } else {
            Swal.fire({
              title: Translate('globals.swal', 'errorTitle'),
              text: errors[key],
              icon: 'error',
              confirmButtonText: Translate('globals', 'ok')
            });
          }
        });

        return;
      } else if (error.error === 'schema-error' && template) {
        const errors = error.reason.errors;

        error.details.forEach(detail => {
          const i = detail.name.lastIndexOf(".");
          const key = detail.name.substring(i + 1);

          const elementsInput = template.$(`input[key='${key}']`)
          const elementsDiv = template.$(`div[data-key='${key}']`);

          let elements;
          if (elementsInput.length != 0) {
            elements = elementsInput;
          } else {
            elements = elementsDiv;
          }

          if (elements.length > 0) {
            elements.addClass('is-invalid');
            const label = elements.siblings('label');
            label.attr('data-content', ` * (Bu alan zorunlu)`);
          } else {
            Swal.fire({
              title: Translate('globals.swal', 'errorTitle'),
              text: detail.message,
              icon: 'error',
              confirmButtonText: Translate('globals', 'ok')
            });
          }
        });

        return;
      } else if (typeof message === 'object') {
        message = Object.values(message?.errors || { text: 'Not found error message' }).join('/n');
      } else if (error.error == 404) {
        if (typeof error.reason === 'string') {
          message = error.reason;
        } else {
          message = error.reason?.error || '';
        }
      }
    }

    if (error.error == 'info') {
      Swal.fire({
        title: Translate('globals.swal', 'infoTitle'),
        text: message,
        icon: 'info',
        confirmButtonText: Translate('globals', 'ok')
      });
      return;
    }

    Swal.fire({
      title: Translate('globals.swal', 'errorTitle'),
      text: message,
      icon: 'error',
      confirmButtonText: Translate('globals', 'ok')
    });
  },

  reset: function (template) {
    template.$('input').removeClass('is-invalid');
    template.$('div').removeClass('is-invalid');
  }
};