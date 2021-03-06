'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'super-rentals',
    environment,
    rootURL: '/',
    locationType: 'auto',
    'ember-simple-leaflet-maps': {
      apiKey: 'pk.eyJ1IjoiZWRvdmdhbCIsImEiOiJjanpiZDF0ejQwOTliM2xwaHVwcm9tM3hmIn0.PdjuzrT-4cEHzQfMEo9qNA'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    //ENV.emberPouch.localDb = 'local-rentals';
    //ENV.emberPouch.remoteDb = 'http://localhost:5984/rentals_development';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    //ENV.emberPouch.localDb = 'local-rentals';
    //ENV.emberPouch.remoteDb = 'http://localhost:5984/rentals_development';
  }

  return ENV;
};
