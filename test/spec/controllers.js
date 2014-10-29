'use strict';

describe('Controller: LoginCtrl', function () {

  var should = chai.should();

  // load the controller's module
  beforeEach(module('EmbassyNetwork'));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of pets to the scope', function () {
    scope.pets.should.have.length(4);
  });

});
