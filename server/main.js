import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Migrations.migrateTo('latest');
  require('/imports/indexes/indexes.js');
  SyncedCron.start();
});

