import Ember from 'ember';
import RentalsController from '../rentals';
import pagedArray from 'ember-cli-pagination/computed/paged-array';
//import computed from '@ember/computed';

export default RentalsController.extend({
  // setup query params
  queryParams: ["page", "perPage"],

  // set default values, can cause problems if left out
  // if value matches default, it won't display in the URL
  page: 1,
  perPage: 2,

  // can be called anything, here it called pagedContent
  // remember to iterate over pagedContent in template
  //pagedContent: pagedArray('content', {
  //  page: Ember.computed.alias("parent.page") || 1,
  //  perPage: Ember.computed.alias("parent.perPage") || 2
  //}),

  pagedContent: pagedArray('content', {
    pageBinding: "page",
    perPageBinding: "perPage"
  }),

  /*
  binding the property on the paged array
  to a property on the controller
  */
  //totalPages: Ember.computed.oneWay("pagedContent.totalPages")

  totalPagesBinding: "pagedContent.totalPages"
  //totalPagesBinding: "totalPages"
});
