import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    save() {
      this.get('model').save().then((rental) => {
        this.transitionToRoute('rentals.show', rental.id);
      });
    },

    cancel() {
      let inputs = document.querySelectorAll('input');
      inputs.forEach((element) => element.value = "");
      this.transitionToRoute('rentals');
    }
  }

});
