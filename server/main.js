import { Meteor } from 'meteor/meteor';
import { onPageLoad } from 'meteor/server-render'
import App from '../imports/app/App.svelte'

Meteor.startup(() => {
  Migrations.migrateTo('latest');
  require('/imports/indexes/indexes.js');
  SyncedCron.start();

  onPageLoad((sink) => {
    console.log(sink);
    const { html, css } = App.render();

    sink.appendToHead(`<style>${css.code}</style>`);
    sink.renderIntoElementById('root', html);
  });
});