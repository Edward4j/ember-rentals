import Route from '@ember/routing/route';

export default Route.extend({

  actions: {
    createRental() {
      let rental = this.store.createRecord('rental', {
        id         : this.controller.newId,
        title      : this.controller.title,
        owner      : this.controller.owner,
        city       : this.controller.city,
        category   : this.controller.category,
        image      : this.controller.image,
        bedrooms   : this.controller.bedrooms,
        description: this.controller.description
      });

      rental.save();

    },

    cancel() {
      let inputs = document.querySelectorAll('input');
      inputs.forEach((element) => element.value = "");
      this.transitionTo('rentals');
    }

  }

});
