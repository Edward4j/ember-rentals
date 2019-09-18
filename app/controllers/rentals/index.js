import Ember from 'ember';
import PouchDB from 'pouchdb';
import RentalsController from '../rentals';
import { inspect } from '@ember/debug';

export default RentalsController.extend({
  page_no: 1,
  pageCount: 5,

  actions: {
    // Bubbled up action from addon
    // clicking on '2' after '5' or clicking 'previous' or 'next' buttons
    getByPageNumber(page_no) {
      // Controller variable defined above to always contain the current requested page
      this.set('page_no', page_no);
      // whatever reload page functionality your page possesses
      //this.send('reload');

    //  var limit = 3;
    //  var options = { limit: limit, skip: limit * (page_no - 1) };
    //  var pouch = new PouchDB('local_rentals');
    //
    //  var results = pouch.allDocs(options, function (err, response) {
    //    if (response && response.rows.length > 0) {
    //      console.log('response.rows.length: ' + response.rows.length);
    //      options.startkey = response.rows[response.rows.length - 1].id;
    //      //options.skip = options.limit * (page_no - 1);
    //      console.log('options.skip: ' + options.skip)
    //    }
    //
    //    console.log("options: " + options.startkey);
    //
    //    console.log("response: " + Ember.inspect(response));
    //    return response;
    //  });
    //
    //  console.log("results: " + Ember.inspect(results));
    //
    //  var finalResults = Ember.A();
    //
    //  return results.then((res) => {
    //    console.log("res: " + res);
    //    console.log("res.rows: " + res.rows);
    //
    //    res.rows.forEach((row) => {
    //      console.log("row: " + row.id);
    //
    //      return pouch.get(row.id).then(function (doc) {
    //        // handle doc
    //
    //        //debugger;
    //        console.log("doc: " + doc._id);
    //        console.log("doc title: " + doc.data.title);
    //        console.log("doc city: " + doc.data.city);
    //
    //        console.log("doc.data: " + Ember.inspect(doc));
    //
    //        //return doc.data;
    //
    //        finalResults.push({ id: doc._id, title: doc.data.title, city: doc.data.city, image: doc.data.image, bedrooms: doc.data.bedrooms });
    //        console.log("getByPageNumber finalResults: " + Ember.inspect(finalResults));
    //
    //        let returning = { query: "", results: finalResults };
    //        console.log("getPageByNumber returning: " + Ember.inspect(returning));
    //
    //        //return { query: "", results: finalResults };
    //        return finalResults;
    //      }).catch(function (err) {
    //        console.log(err);
    //      });
    //    });
    //
    //    //return res.rows
    //    console.log("getByPageNumber finalResults - Before Return 2 statement: " + Ember.inspect(finalResults));
    //    //return { query: "", results: finalResults };
    //    return finalResults;
    //  });
    //  console.log("getByPageNumber finalResults - Before Return 3 statement: " + Ember.inspect(finalResults));
    //  //return { query: "", results: finalResults };
    //  //return finalResults;


      var [limit, page_no] = [3, 1];
      var options = {limit: limit, skip: limit * (page_no - 1)};
      var pouch = new PouchDB('local_rentals');

      return pouch.allDocs(options, (err, response) => {
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

        var finalResults = Ember.A();

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

        return finalResults;

      });
      debugger;
    }
  }
});
