'use strict';
angular.module('EmbassyNetwork.controllers', [])

.controller('AppCtrl', function($scope, USER_ROLES, AuthService) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;
  $scope.isLoginPage = false;
 
  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };
  
})

.controller('LoginCtrl', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
  $scope.credentials = localStorage.getItem('credentials') || {
    username: '',
    password: ''
  };
  console.log('loaded credentials: ', $scope.credentials.username, $scope.credentials.password);

  $scope.login = function (credentials) {
    console.log(credentials);
    AuthService.login(credentials).success(function(user) {
      console.log('success', user);
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    })
    .error(function(data, status, headers, config) {
      console.log('fail', data, status, headers, config);
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
})

.controller('TodayCtrl', function($scope, Today) {
  console.log('TodayCtrl', Today.getList());
})

.controller('MessagesCtrl', function($scope, Messages) {
//  console.log('Messages: ', Messages);
  $scope.messages = Messages.getList();
})

.controller('MessageDetailCtrl', function($scope, $stateParams, Messages) {
  $scope.message = Messages.get($stateParams.messageId);
})

.controller('AccountCtrl', function($scope) {
//  console.log('AccountCtrl');
});
