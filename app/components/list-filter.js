import Ember from 'ember';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['list-filter'],
  value: '',

  init() {
    this._super(...arguments);
    this.filter('').then((allResults) => {
      console.log("From init() ListFilter - allResults: " + Ember.inspect(allResults));
      //debugger;
      //this.set('results', allResults.results);

      if (typeof(allResults) === 'undefined') {
        this.set('results', this._target.get('model').slice(0, 3));
        } else {
        this.set('results', allResults.results);
        }
    });

    //if(allResults === undefined) {
    //  this.set('results', this._target.get('model').slice(0, 3));
    //} else {
    //  this.set('results', allResults.results);
    //}

  },

  actions: {
    handleFilterEntry() {
      let filterInputValue = this.value;
      let filterAction = this.filter;
      filterAction(filterInputValue).then((filterResults) => {
        //debugger;
        if (filterResults.query === this.value) {
          this.set('results', filterResults.results);
        }
      });
    }
  }
});
