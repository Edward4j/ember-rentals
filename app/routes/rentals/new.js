import Route from '@ember/routing/route';

export default Route.extend({

  actions: {
    createRental() {
      let newRental = this.store.createRecord('rental', {
        id         : this.controller.newId,
        title      : this.controller.title,
        owner      : this.controller.owner,
        city       : this.controller.city,
        category   : this.controller.category,
        image      : this.controller.image,
        bedrooms   : this.controller.bedrooms,
        description: this.controller.description
      });

      newRental.save().then((rental) => {
        this.transitionTo('rentals.show', rental.id);
      });

    },

    cancel() {
      let inputs = document.querySelectorAll('input');
      inputs.forEach((element) => element.value = "");
      this.transitionTo('rentals');
    }

  }

});
