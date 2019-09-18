//import DS from 'ember-data';
import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';

//PouchDB.debug.enable('*');

var remote = new PouchDB('https://my.couchcluster.com/rentals');
var db = new PouchDB('http://localhost:5984/rentals_development');

db.sync(remote, {
  live: true, // do a live, ongoing sync
  retry: true // retry if the connection is lost
});

//export default DS.JSONAPIAdapter.extend({
export default Adapter.extend({
  //namespace: 'api',
  db: db
});
