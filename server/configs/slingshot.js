// import AWS from 'aws-sdk';
// AWS.config = new AWS.Config();
// AWS.config.accessKeyId = Meteor.settings.aws.accessKeyId;
// AWS.config.secretAccessKey = Meteor.settings.aws.secretAccessKey;
// AWS.config.region = Meteor.settings.aws.region;
// const sts = new AWS.STS();

// Slingshot.createDirective('appImage', Slingshot.S3Storage.TempCredentials, {
//   region: Meteor.settings.aws.region,
//   bucket: Meteor.settings.aws.bucket,
//   acl: Meteor.settings.aws.acl,
//   temporaryCredentials: Meteor.wrapAsync(function (expire, callback) {
//     //AWS dictates that the minimum duration must be 900 seconds:
//     var duration = Math.max(Math.round(expire / 1000), 900);

//     sts.getSessionToken({
//       DurationSeconds: duration
//     }, function (error, result) {
//       callback(error, result && result.Credentials);
//     });
//   }),

//   authorize: function (file, metaContext) {
//     //Deny uploads if user is not logged in.
//     if (!this.userId) {
//       var message = "Please login before posting files";
//       throw new Meteor.Error("Login Required", message);
//     }

//     return true;
//   },

//   key: function (file, metaContext) {
//     //Store file into a directory by the user's username.
//     const fileName = file.name.toLowerCase();
//     return `zigo/app-images/${Random.id()}-${fileName}`;
//   }
// });

// Slingshot.createDirective('appFile', Slingshot.S3Storage.TempCredentials, {
//   region: Meteor.settings.aws.region,
//   bucket: Meteor.settings.aws.bucket,
//   acl: Meteor.settings.aws.acl,
//   temporaryCredentials: Meteor.wrapAsync(function (expire, callback) {
//     //AWS dictates that the minimum duration must be 900 seconds:
//     var duration = Math.max(Math.round(expire / 1000), 900);

//     sts.getSessionToken({
//       DurationSeconds: duration
//     }, function (error, result) {
//       callback(error, result && result.Credentials);
//     });
//   }),

//   authorize: function (file, metaContext) {
//     //Deny uploads if user is not logged in.
//     if (!this.userId) {
//       var message = "Please login before posting files";
//       throw new Meteor.Error("Login Required", message);
//     }

//     return true;
//   },

//   key: function (file, metaContext) {
//     //Store file into a directory by the user's username.
//     const fileName = file.name.toLowerCase();
//     return `zigo/app-file/${Random.id()}-${fileName}`;
//   }
// });