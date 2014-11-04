'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('EmbassyNetwork', [
  'ionic',
  'config',
  'EmbassyNetwork.controllers',
  'EmbassyNetwork.services',
  'restangular'
])

.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  user: 'user',
  guest: 'guest'
})

.directive('loginDialog', function (AUTH_EVENTS) {
  return {
    restrict: 'A',
    template: '<div ng-if="visible" ng-include="\'templates/login.html\'">',
    link: function (scope) {
      var showDialog = function () {
        console.log('showDialog');
        scope.visible = true;
      };
      var hideDialog = function () {
        console.log('hideDialog');
        scope.visible = false;
      };
      scope.visible = false;
      scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
      scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
      scope.$on(AUTH_EVENTS.notAuthorized, showDialog);
      scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
      scope.$on(AUTH_EVENTS.loginSuccess, hideDialog);
    }
  };
})

.run(function($ionicPlatform, $rootScope, AUTH_EVENTS, AuthService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, USER_ROLES, RestangularProvider, ENV) {
  RestangularProvider.setBaseUrl(ENV.apiEndpoint);
  console.log('baseUrl:', ENV.apiEndpoint);

  RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
    if (operation === "getList") {
        response = data.objects;
        response.metadata = data.meta;
    } else {
        console.log('data', data);
        response = data.data;
    }
    return response;
  });
  
  var refreshAccesstoken = function() {
      var deferred = $q.defer();

      // Refresh access-token logic

      return deferred.promise;
  };

  RestangularProvider.setErrorInterceptor(function(response, deferred, responseHandler) {
    if(response.status === 403) {
      refreshAccesstoken().then(function() {
        // Repeat the request and then call the handlers the usual way.
        $http(response.config).then(responseHandler, deferred.reject);
        // Be aware that no request interceptors are called this way.
      });

      return false; // error handled
    }

    return true; // error not handled
  });  
  
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'SignInCtrl'
    })
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      data: {
        authorizedRoles: [USER_ROLES.user, USER_ROLES.admin]
      }
    })
    
    // Each tab has its own nav history stack:
    .state('tab.today', {
      url: '/today',
      views: {
        'tab-today': {
          templateUrl: 'templates/tab-today.html',
          controller: 'TodayCtrl'
        }
      }
    })

    .state('tab.messages', {
      url: '/messages',
      views: {
        'tab-messages': {
          templateUrl: 'templates/tab-messages.html',
          controller: 'MessagesCtrl'
        }
      }
    })
    .state('tab.message-detail', {
      url: '/message/:messageId',
      views: {
        'tab-messages': {
          templateUrl: 'templates/message-detail.html',
          controller: 'MessageDetailCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/today');

});

