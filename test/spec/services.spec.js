'use strict';

describe('Service: Locations', function () {
  var Locations,
    httpBackend,
    rootScope;

  // load the controller's module
  beforeEach(module('EmbassyNetwork'));

  beforeEach(inject(function($injector) {
    jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures';
    Locations = $injector.get('Locations');
    httpBackend = $injector.get('$httpBackend');
    rootScope = $injector.get('$rootScope');

    $injector.get('Restangular').setBaseUrl('');

    httpBackend.whenGET('/locations').respond(200, getJSONFixture('locations.json'));
    httpBackend.whenGET(/templates\/.*/).respond();
  }));

  it('should get a list of locations', function (done) {
    Locations.getList().then(function(locations) {
      locations.forEach(function(loc) {
        expect(loc.address).toBeDefined();
      });
      done();
    }, function(response) {
      console.log("Error with status code");
    });
    httpBackend.flush();
    rootScope.$apply();
  });

});
