import Component from '@ember/component';

export default Component.extend({
  classNames: ['rental-form'],
  value: 'foo',
  //actions: {
  //  cancel(rental) {
  //    //let inputs = document.querySelectorAll('input');
  //    //inputs.forEach((element) => element.value = "");
  //    this.transitionToRoute('rentals.show', rental.id);
  //  }
  //}

  actions: {
    updateTitle() {
      let newValue = this.value;
      let rental = this._target.get('model');
      rental.set('title', newValue);
    }
  }
});
