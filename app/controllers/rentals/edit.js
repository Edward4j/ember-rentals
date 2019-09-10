import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save(rental) {
      console.log('From Rental edit Controller - rental: ' + rental);
      //debugger;
      //let oldRental = this.store.get('model');
      //console.log('Old rental: ' + oldRental);

      let oldModel = this.get('model');
      console.log('old model: ' + oldModel);
      console.log('old model owner: ' + oldModel.owner);
      console.log('old model title: ' + oldModel.title);
      debugger;
    },
    cancel(rental) {
      console.log('From Edit cancel - Rental edited: ' + rental);
      this.transitionToRoute('rentals');
    }
  }
});
