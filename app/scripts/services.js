'use strict';
angular.module('EmbassyNetwork.services', [])

.factory('AuthService', function ($http, ENV) {
  var authService = {};
  var apiEndpoint = ENV.apiEndpoint;

  
  var storedCredentials = localStorage.getItem('credentials');
  console.log('AuthService.credentials:', storedCredentials.username);
  var storedAuth = btoa(storedCredentials.username + ':' + storedCredentials.password);
  $http.defaults.headers.common.Authorization = 'Basic ' + storedAuth;
 
  authService.login = function (credentials) {
    var storedCredentials = localStorage.getItem('credentials');
    console.log('AuthService.credentials1:', storedCredentials.username);
    localStorage.setItem('credentials', credentials);
    var storedCredentials = localStorage.getItem('credentials');
    console.log('AuthService.credentials2:', storedCredentials.username);
    var auth = btoa(credentials.username + ':' + credentials.password);
    $http.defaults.headers.common.Authorization = 'Basic ' + auth;
    return $http.get(apiEndpoint + '/auth/user/');
  };
 
  return authService;
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      console.log('response.status:', response.status);
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        419: AUTH_EVENTS.sessionTimeout,
        440: AUTH_EVENTS.sessionTimeout
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.factory('Users', function(Restangular) {
  return Restangular.service('users');
})

.factory('Messages', function(Restangular) {
  return Restangular.service('messages');
})

.factory('Today', function(Restangular) {
  return Restangular.service('today');
})

.factory('Locations', function(Restangular) {
  return Restangular.service('locations');
});
