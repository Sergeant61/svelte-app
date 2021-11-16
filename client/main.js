import { Meteor } from 'meteor/meteor';
import App from '../imports/app/App.svelte';
import './configs';

Meteor.startup(() => {
  const app = new App({
    target: document.getElementById('app')
  });
});