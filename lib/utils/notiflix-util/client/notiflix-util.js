import Notiflix from 'notiflix';

NotiFlixUtil = {
  show: function (callback, _title = Translate('globals.swal', 'successTitle'), _message = Translate('globals.swal', 'successText')) {
    Swal.fire({
      title: _title,
      text: _message,
      icon: 'success',
      confirmButtonText: Translate('globals', 'ok')
    }).then(r => {
      callback(r)
    });
  },

  update: function (callback, _title = Translate('globals.swal', 'successTitle'), _message = Translate('globals.swal', 'updated')) {
    Swal.fire({
      title: _title,
      text: _message,
      icon: 'success',
      confirmButtonText: Translate('globals', 'ok')
    }).then(r => {
      callback(r)
    });
  },

  add: function (callback, _title = Translate('globals.swal', 'successTitle'), _message = Translate('globals.swal', 'added')) {
    Swal.fire({
      title: _title,
      text: _message,
      icon: 'success',
      confirmButtonText: Translate('globals', 'ok')
    }).then(r => {
      callback(r)
    });
  },

  deleteAreYouSure: function (callback, _title = Translate('globals.swal', 'areYouSureTitle'), _message = Translate('globals.swal', 'willBeDeleteText')) {
    Swal.fire({
      title: _title,
      text: _message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-danger)',
      cancelButtonColor: 'var(--bs-warning)',
      cancelButtonText: Translate('globals.no'),
      confirmButtonText: Translate('globals.yes')
    }).then(r => {
      callback(r)
    });
  },

  confirmAreYouSure: function (callback, _title = Translate('globals.swal', 'areYouSureTitle'), _message = Translate('globals.swal', 'willBeConfirmedText')) {
    Swal.fire({
      title: _title,
      text: _message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--bs-danger)',
      cancelButtonColor: 'var(--bs-warning)',
      cancelButtonText: Translate('globals.no'),
      confirmButtonText: Translate('globals.yes')
    }).then(r => {
      callback(r)
    });
  },
};