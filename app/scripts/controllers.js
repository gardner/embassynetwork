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
    AuthService.login(credentials).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
})

.controller('TodayCtrl', function($scope) {
  console.log('TodayCtrl');
})

.controller('MessagesCtrl', function($scope, Messages) {
  $scope.messages = Messages.all();
})

.controller('MessageDetailCtrl', function($scope, $stateParams, Messages) {
  $scope.message = Messages.get($stateParams.messageId);
})

.controller('AccountCtrl', function($scope) {
  console.log('AccountCtrl');
});
