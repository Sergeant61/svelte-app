Slingshot.fileRestrictions('appImage', {
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
  maxSize: 20 * 1024 * 1024
});


Slingshot.fileRestrictions('appFile', {
  allowedFileTypes: /.*/i,
  maxSize: 20 * 1024 * 1024
});