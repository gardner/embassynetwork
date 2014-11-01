'use strict';

describe('Service: AuthService', function () {
  var should = chai.should();
  var AuthService,
    httpBackend;

  // load the controller's module
  beforeEach(module('EmbassyNetwork'));

  beforeEach(inject(function (_AuthService_, $httpBackend) {
    AuthService = _AuthService_;
    httpBackend = $httpBackend;
  }));
});

describe('Service: LocationsService', function () {
  var should = chai.should();
  var LocationsService,
    httpBackend;

  // load the controller's module
  beforeEach(module('EmbassyNetwork'));

  beforeEach(inject(function (_LocationsService_, $httpBackend, ENV) {
    jasmine.getJSONFixtures().fixturesPath='test/fixtures';
    LocationsService = _LocationsService_;
    httpBackend = $httpBackend;
  }));

  it('should get a list of locations', function () {
    console.log('thing');
    console.log('thing');
    console.log('thing');
    console.log('thing');
    console.log('thing');
    console.log('thing');
    console.log('thing');
    console.log('thing');
    console.log('thing');
    console.log('thing');
    httpBackend.whenGET('/locations').respond(
        getJSONFixture('locations.json')
    );
//    LocationsService.
  });

});
