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

.controller('LoginCtrl', function ($scope, $http, $localStorage, authService) {
  console.log('create login controller');
  $scope.user = {
    username: $localStorage.get('username'),
    password: $localStorage.get('password')
  };

  $scope.submit = function() {
    console.log('user', $scope.user);
    $http.post(
      $scope.apiEndpoint + '/users/login/',
      JSON.stringify({ username: $scope.user.username, password: $scope.user.password })
    ).success(
      function(data) {
        console.log('LoginController submit success');
        $http.defaults.headers.common['Authorization'] = 'ApiKey ' + data.username + ':' + data.key;
        $localStorage.set('Authorization', $http.defaults.headers.common['Authorization']);
        authService.loginConfirmed({}, function(config) {
          config['headers']['Authorization'] = 'ApiKey ' + data.username + ':' + data.key;
        });
      }
    ).error(
      function(data) {
        console.log('LoginController submit error');
        $scope.errorMsg = data.reason;
      }
    );
  };
  
  $scope.$on('event:auth-loginRequired', function(e, rejection) {
    console.log('login required');
    $localStorage.set('Authorization', '');
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

.controller('TodayCtrl', function($scope, Today, $state, $localStorage) {
  if (!$localStorage.get('location_id')) {
    $state.go('tab.account');
  }
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
      $state.go('tab.messages');
    });
  };
})

.controller('AccountCtrl', function($scope, Locations, $state, $localStorage) {
  $scope.user = {
    location_id: $localStorage.get('location_id')
  }
  Locations.getList().then(function(locations) {
    $scope.locations = locations;
    console.log('Locations: ', $scope.locations);
  });
  $scope.setLocation = function() {
    // the user selected a location
    $localStorage.set('location_id', $scope.user.location_id);
    $state.go('tab.today');
  };
});
