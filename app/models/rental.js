import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
  title      : DS.attr(),
  owner      : DS.attr(),
  city       : DS.attr(),
  category   : DS.attr(),
  image      : DS.attr(),
  bedrooms   : DS.attr(),
  description: DS.attr(),
  rev        : DS.attr('string') // This is for PouchDB/CouchDB to handle revisions.
});
