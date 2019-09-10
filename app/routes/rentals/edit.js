import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    console.log("Edit Rental: params rental_id " + params.rental_id);
    return this.store.findRecord('rental', params.rental_id);
  },
  setupController(controller, model) {
    this._super(controller, model);
  }
});
