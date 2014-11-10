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
})

.factory('$localStorage', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
});