import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { routes, onAuthChange } from './../imports/routes/routes';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { Poems } from '../imports/api/poems';

import '../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
