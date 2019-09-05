import Controller from '@ember/controller';

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
        return this.store
          .findAll('rental').then((results) => {
            return { query: param, results: results };
          });
      }
    }

  }
});
