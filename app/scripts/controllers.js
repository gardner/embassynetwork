'use strict';
angular.module('EmbassyNetwork.controllers', ['ngCookies'])

.controller('AppCtrl', function($scope, ENV, $ionicModal, $cookies) {
  $scope.user = {
    location_id: $cookies.location_id,
    username: $cookies.username,
    password: $cookies.password
  };
  $scope.apiEndpoint = ENV.apiEndpoint;
  
  $ionicModal.fromTemplateUrl('templates/login.html', function(modal) {
      console.log('create modal');
      $scope.loginModal = modal;
    },
    {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }
  );

  $scope.$on('$destroy', function() {
    console.log('destroy modal');
    $scope.loginModal.remove();
  });  

})

.controller('LoginCtrl', function ($scope, $http, authService) {
  console.log('create login controller');

  $scope.submit = function() {
    console.log($scope.user);
    $http.post(
      $scope.apiEndpoint + '/user/login/',
      JSON.stringify({ username: $scope.user.username, password: $scope.user.username.password })
    ).success(
      function(data) {
        console.log('LoginController submit success');
        //debugger;
        $cookies.username = data.username;
        $cookies.key = data.key;
        $http.defaults.headers.common['Authorization'] = 'ApiKey ' + data.username + ':' + data.key;
        authService.loginConfirmed();
      }
    ).error(
      function(data) {
        console.log('LoginController submit error');
        $scope.errorMsg = data.reason;
        //debugger;
      }
    );
  };
  
  $scope.$on('event:auth-loginRequired', function(e, rejection) {
    console.log('login confirmed');
    console.log('login required');
    $scope.loginModal.show();
  });
  
  $scope.$on('event:auth-expired', function(e, rejection) {
    $scope.loginModal.show();
  });
  
  $scope.$on('event:auth-loginConfirmed', function() {
    console.log('login confirmed');
    $scope.username = null;
    $scope.password = null;
    $scope.loginModal.hide();
  });
  
})

.controller('TodayCtrl', function($scope, Today) {
  console.log('TodayCtrl');
})

.controller('MessagesCtrl', function($scope, Messages) {
  Messages.getList().then(function(messages) {
    $scope.messages = messages;
    console.log('Messages: ', $scope.messages);
  });
})

.controller('MessageDetailCtrl', function($scope, $stateParams, Messages) {
  $scope.message = Messages.get($stateParams.messageId);
})

.controller('AccountCtrl', function($scope, Locations, $location) {
  Locations.getList().then(function(locations) {
    $scope.locations = locations;
    console.log('Locations: ', $scope.locations);
  });
  $scope.setLocation = function() {
    console.log($scope.user);
    // the user selected a location
    $location.path('/today');
  };
  
  console.log('AccountCtrl', $scope.message);
});
