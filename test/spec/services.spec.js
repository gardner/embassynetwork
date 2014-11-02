'use strict';

describe('Service: AuthService', function () {
  var AuthService,
    httpBackend;

  // load the controller's module
  beforeEach(module('EmbassyNetwork'));

  beforeEach(inject(function (_AuthService_, $httpBackend) {
    AuthService = _AuthService_;
    httpBackend = $httpBackend;
  }));
});

describe('Service: Locations', function () {
  var Locations,
    httpBackend;

  // load the controller's module
  beforeEach(module('EmbassyNetwork'));

  beforeEach(inject(function (_Locations_, $httpBackend, ENV) {
    jasmine.getJSONFixtures().fixturesPath = 'base/test/fixtures';
    Locations = _Locations_;
    
    httpBackend = $httpBackend;
  }));

  it('should get a list of locations', function () {
    console.log('Locations.getList()');
    httpBackend.whenGET('/locations').respond(
        getJSONFixture('locations.json')
    );
    console.log(Locations.getList());
  });

});
