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
  'ngCookies',
  'EmbassyNetwork.controllers',
  'EmbassyNetwork.services',
  'restangular',
  'http-auth-interceptor'
])

.run(function($ionicPlatform, $http, $cookies) {
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
    $http.defaults.headers.common['Authorization'] = 'ApiKey ' + $cookies.username + ':' + $cookies.key;
    
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, RestangularProvider, ENV) {
  RestangularProvider.setBaseUrl(ENV.apiEndpoint);
  console.log('baseUrl:', ENV.apiEndpoint);

  RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
    if (operation === 'getList') {
      response = data.objects;
      response.metadata = data.meta;
    } else {
      response = data.data;
    }
    return response;
  });
  
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
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
    .state('tab.message.detail', {
      url: '/:messageId',
      views: {
        'tab-messages': {
          templateUrl: 'templates/message-detail.html',
          controller: 'MessageDetailCtrl'
        }
      }
    })
    .state('tab.message-compose', {
      url: '/message/new',
      views: {
        'tab-messages': {
          templateUrl: 'templates/message-compose.html',
          controller: 'MessageComposeCtrl'
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
  console.log('done loading app');
});

