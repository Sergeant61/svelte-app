Iti = {
  init: function(_element) {
    return window.intlTelInput(_element, {
      onlyCountries: ['tr'],
      // preferredCountries: ['tr'],
      separateDialCode: true,
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.0/js/utils.js',
    });
  }
}