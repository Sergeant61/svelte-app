// import { Meteor } from 'meteor/meteor';
// import App from '../imports/app/App.svelte';
import './configs';

// Meteor.startup(() => {
//   const app = new App({
//     target: document.getElementById('app')
//   });
// });

import App from '../imports/app/App.svelte';
import { onPageLoad } from 'meteor/server-render';

onPageLoad(() => {
  new App({
    target: document.querySelector('#app'),
    hydrate: true
  });
});