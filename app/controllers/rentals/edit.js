import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    save(rental) {
      return rental.save().then((updatedRental) => {
        this.transitionToRoute('rentals.show', updatedRental.id);
      })
    },
    cancel(rental) {
      console.log('From Edit cancel - Rental edited: ' + rental);
      this.transitionToRoute('rentals');
    }
  }
});
