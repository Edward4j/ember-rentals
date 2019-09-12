import Route from '@ember/routing/route';
//import PagedRemoteArray from 'ember-cli-pagination/remote/paged-remote-array';
import PagedArray from 'ember-cli-pagination/local/paged-array';

export default Route.extend({
  //model() {
  //  return this.store.findAll('rental');
  //}

  //model: function(params) {
  //  // possible params are params.page and params.per_page
  //  // Ember's query param logic converts perPage to per_page at some point, for now just dealing with it.
  //
  //  return PagedRemoteArray.create({modelName: 'rental',
  //    store: this.store,
  //    page: params.page || 1,
  //    perPage: params.per_page || 5 });
  //}

  model(params) {
    var rentals = Ember.A(this.store.findAll('rental'));

    var paged = PagedArray.create({ content: rentals, perPage: 2 });

    return paged;
  }
});
