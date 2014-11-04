'use strict';
angular.module('EmbassyNetwork.services', [])

// kiped from:
// https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec by gardner

.factory('AuthService', function ($http, Session, ENV) {
  var authService = {};
  var apiEndpoint = ENV.apiEndpoint;
 
  authService.login = function (credentials) {
    localStorage.setItem('credentials', credentials);
    return $http
      .post(apiEndpoint + '/auth/user/', credentials)
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
