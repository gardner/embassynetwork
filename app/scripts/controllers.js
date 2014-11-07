'use strict';
angular.module('EmbassyNetwork.controllers', ['ngCookies'])

.controller('AppCtrl', function($scope, ENV, $ionicModal, $state) {
  $scope.apiEndpoint = ENV.apiEndpoint;
  
  $scope.goto = function(stateName) {
    $state.go(stateName);
  };
  
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

.controller('LoginCtrl', function ($scope, $http, $cookies, authService) {
  console.log('create login controller');
  $scope.user = {
    location_id: $cookies.location_id,
    username: $cookies.username,
    password: $cookies.password
  };

  $scope.submit = function() {
    console.log('user', $scope.user);
    $http.post(
      $scope.apiEndpoint + '/users/login/',
      JSON.stringify({ username: $scope.user.username, password: $scope.user.password })
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
  if ($stateParams.messageId) {
    $scope.message = Messages.get($stateParams.messageId);
  } else {
    $scope.message = {};
  }
})

.controller('MessageComposeCtrl', function($scope, $stateParams, Messages, Users, $state) {
  $scope.data = {
    users: []
  }
  $scope.message = {
    recipient: '',
    subject: '',
    body: ''
  }
  $scope.possibleRecipients = [];
  
  // get all users from a tastypie endpoint
  Users.getList({limit: 0, order_by:'-last_login'}).then(function(users) {
    $scope.data.users = users;
    console.log('Got', $scope.data.users.length, 'users.');
  });

  // the ng-click action of the list-items
  $scope.selectRecipient = function(recipient) {
    console.log('recipient', recipient);
    $scope.message.to = recipient;
    $scope.message.recipient = recipient.username;
    $scope.possibleRecipients = [];
  };
  
  // filter the list of recipients
  $scope.autocomplete = function() {
    if ($scope.message.recipient.length < 3) return;
    $scope.possibleRecipients = $scope.data.users.filter(function(r) {
    	if(r.username.toLowerCase().indexOf($scope.message.recipient.toLowerCase()) !== -1 ) return true;
    })
  };
  
  $scope.resetAutoComplete = function() {
    $scope.possibleRecipients = [];
  };

  // post the message and reset the values
  $scope.sendMessage = function(message) {
    $scope.message.recipient = $scope.message.to.resource_uri;
    delete $scope.message.to;
    $scope.possibleRecipients = [];
    console.log('Sending', $scope.message);
    // reset message form
    Messages.post($scope.message).then(function() {
      $scope.message = {
        recipient: '',
        subject: '',
        body: ''
      };
      $state.go('/messages');
    });
  };
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
