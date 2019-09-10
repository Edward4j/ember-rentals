import Component from '@ember/component';

export default Component.extend({
  classNames: ['rental-form'],

  actions: {
    updateTitle(newTitle) {
      let rental = this._target.get('model');
      rental.set('title', newTitle);
    }
  }
});
