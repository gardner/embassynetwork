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

  it('should login', function () {
    httpBackend.whenGET("http://api.reddit.com/user/yoitsnate/submitted.json").respond({
  });

});
