'use strict';
angular.module('EmbassyNetwork.services', [])

.factory('Users', function(Restangular) {
  return Restangular.service('users/');
})
// $scope.accounts = Restangular.all('accounts').getList().$object;
.factory('Messages', function(Restangular) {
  return Restangular.service('messages/');
})

.factory('Today', function(Restangular) {
  return Restangular.service('today/');
})

.factory('Locations', function(Restangular) {
  return Restangular.service('locations/');
});
