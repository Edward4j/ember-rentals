import Ember from 'ember';
import { isEmpty } from '@ember/utils';
import { inspect } from '@ember/debug';
import Route from '@ember/routing/route';
import PouchDB from 'pouchdb';

export default Route.extend({
  model() {
    //return this.store.findAll('rental');

    //return this.store.query('rental', {
    //  //filter: {
    //  //  bedrooms: { '$gte': null }
    //  //},
    //  //sort: [
    //  //  { bedrooms: 'desc' }
    //  //],
    //  limit: 3
    //})

    var [limit, page_no] = [3, 1];
    var finalResults = Ember.A();
    var options = {limit: limit, skip: limit * (page_no - 1)};
    var pouch = new PouchDB('local_rentals');

    return pouch.allDocs(options, function (err, response) {
      if (response && response.rows.length > 0) {
        console.log('Route Model - response.rows.length: ' + response.rows.length);
        options.startkey = response.rows[response.rows.length - 1].id;
        //options.skip = options.limit * (page_no - 1);
        console.log('Route Model - options.skip: ' + options.skip)
      }

      console.log("Route Model - options: " + options.startkey);

      console.log("Route Model - response: " + inspect(response));
    }).then((results) => {
      console.log("Route Model - results: " + inspect(results));

      //var finalResults = Ember.A();

      results.rows.forEach((row) => {
        console.log("Route Model - row: " + row.id);

        return pouch.get(row.id).then((doc) => {
          // handle doc

          //debugger;
          console.log("Route Model - doc: " + doc._id);
          console.log("Route Model - doc title: " + doc.data.title);
          console.log("Route Model - doc city: " + doc.data.city);

          console.log("Route Model - doc.data: " + inspect(doc));

          //return doc.data;

          finalResults.push({
            id: doc._id,
            title: doc.data.title,
            city: doc.data.city,
            image: doc.data.image,
            bedrooms: doc.data.bedrooms
          });
          console.log("Route Model - finalResults: " + Ember.inspect(finalResults));

          let returning = { query: '', results: finalResults };
          console.log("From Model Route - returning: " + inspect(returning));

          return finalResults;
          //return { query: "", results: finalResults };
        }).catch(function (err) {
          console.log(err);
        });
      });

      return isEmpty(finalResults) ? [ { id: "rental_2_4753192B-618E-69DC-A2DB-6CCF8BC73F22", title: "Downtown Toronto", city: "Toronto", image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Toronto_August_2017.jpg", bedrooms: "1000000" }, { id: "rental_2_B9362A43-99B1-1156-88FC-2A72F6EFAE10", title: "Victorian house at 38 Princetown Road", city: "Bangor 38 Princetown Road", image: "https://upload.wikimedia.org/wikipedia/commons/5/58/Lte_Victorian_Bargeboards.jpg", bedrooms: "10" } ] : finalResults;

    });

  }
});
