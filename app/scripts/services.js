'use strict';
angular.module('EmbassyNetwork.services', [])

// kiped from:
// https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec by gardner

.factory('AuthService', function ($http, Session) {
  var authService = {};
 
  authService.login = function (credentials) {
    console.log('credentials:', credentials);
    localStorage.setItem('credentials', credentials);
    return $http
      .post('/login', credentials)
      .then(function (res) {
        console.log(res);
        Session.create(res.data.id, res.data.user.id,
                       res.data.user.role);
        return res.data.user;
      });
  };
 
  authService.isAuthenticated = function () {
    console.log('auth', Session.userId);
    return !!Session.userId;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    console.log('authorizedRoles:', authorizedRoles);
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    var rc = ((authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1));
    console.log('isAuthorized =', rc);
    return rc;
  };
 
  return authService;
})

.service('Session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
  return this;
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    request: function (config) {

      // use this to destroying other existing headers
      config.headers = {'Authentication':'authentication'}

      // use this to prevent destroying other existing headers
      // config.headers['Authorization'] = 'authentication;

      return config;
    },    
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

/**
 * A simple example service that returns some data.
 */
.factory('Messages', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var messages = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return messages;
    },
    get: function(messageId) {
      // Simple index lookup
      return messages[messageId];
    }
  };
})
.factory('LocationsService', function ($http, Session) {
  var LocationsService = {};
 
  LocationsService.login = function (credentials) {
    console.log('credentials:', credentials);
    localStorage.setItem('credentials', credentials);
    return $http
      .post('/login', credentials)
      .then(function (res) {
        console.log(res);
        Session.create(res.data.id, res.data.user.id,
                       res.data.user.role);
        return res.data.user;
      });
  };
 
  return LocationsService;
});
