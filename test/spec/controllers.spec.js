'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('EmbassyNetwork'));

  var LoginCtrl, httpBackend, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    httpBackend = $httpBackend;
    scope = $rootScope.$new();
    console.log('scope', scope);
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
    console.log('LoginCtrl', LoginCtrl);
  }));
  
  

  it('should login successfully', function () {
    expect(LoginCtrl).not.toBeUndefined();
    console.log('scope', scope);
  });

});
