import Ember from 'ember';
import Controller from '@ember/controller';
import PouchDB from 'pouchdb';
import { inspect } from '@ember/debug';

export default Controller.extend({
  actions: {
    //filterByCity(param) {
    //  if (param !== '') {
    //    return this.store
    //      .query('rental', { city: param }).then((results) => {
    //        return { query: param, results: results };
    //      });
    //  } else {
    //    return this.store
    //      .findAll('rental').then((results) => {
    //        return { query: param, results: results };
    //      });
    //  }
    //}

    filterByCity(param) {
      if (param !== '') {
        return this.store
          .findAll('rental').then((results) => {
            let finalResults = results.filter((result) => {
              return result.get('city').toLowerCase().indexOf(param.toLowerCase()) !== -1;
            });
            return { query: param, results: finalResults };
          });
      } else {
        //debugger;
        //return this.store
        //  .findAll('rental').then((results) => {
        //    return { query: param, results: results };
        //  });

        var limit = 3;
        var currentPage = this.page_no || 1;
        var finalResults = Ember.A();

        console.log('filterByCity currentPage: ' + currentPage);

        var options = { limit: limit, skip: limit * (currentPage - 1) };
        var pouch = new PouchDB('local_rentals');

        return pouch.allDocs(options, (err, response) => {
          if (response && response.rows.length > 0) {
            console.log('filterByCity response.rows.length: ' + response.rows.length);
            options.startkey = response.rows[response.rows.length - 1].id;
            //options.skip = options.limit * (page_no - 1);
            console.log('filterByCity options.skip: ' + options.skip)
          }

          console.log("filterByCity options: " + options.startkey);

          console.log("filterByCity response: " + inspect(response));
          debugger;
          //return response;
          //return { query: param, results: response };
        }).then((res) => {
          console.log("filterByCity res: " + inspect(res));
          console.log("filterByCity res.rows: " + inspect(res.rows));

          //var finalResults = Ember.A();

          res.rows.forEach((row) => {
            console.log("filterByCity row: " + row.id);

            return pouch.get(row.id).then(function (doc) {
              // handle doc

              //debugger;
              console.log("filterByCity doc: " + doc._id);
              console.log("filterByCity doc title: " + doc.data.title);
              console.log("filterByCity doc city: " + doc.data.city);

              console.log("filterByCity doc.data: " + inspect(doc));

              //finalResults.push({ "id": doc._id, "title": doc.data.title, "city": doc.data.city });
              finalResults.push({ id: doc._id, title: doc.data.title, city: doc.data.city, image: doc.data.image, bedrooms: doc.data.bedrooms });
              //finalResults.push(doc);
              console.log("filterByCity finalResults: " + inspect(finalResults));
              //let returning = { query: param, results: finalResults };
              //console.log("filterByCity returning: " + inspect(returning));

              //return { query: param, results: finalResults };
              //return finalResults;
            }).catch(function (err) {
              console.log(err);
            });
          });
            debugger;
            console.log("filterByCity 2nd Return - finalResults: " + inspect(finalResults));
            //console.log("filterByCity 2nd Return - superResults: " + inspect(superResults));
            //return { query: param, results: finalResults };
            return finalResults;



        });
        //debugger;
      }
    }

  }
});
