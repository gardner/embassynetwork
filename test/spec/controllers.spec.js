'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('EmbassyNetwork'));

  var LoginCtrl, httpBackend, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    httpBackend = $httpBackend;
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  it('should login successfully', function () {
    //
  });

});
