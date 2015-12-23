var app = angular.module("app", ["xeditable", "ngMockE2E", "ngAnimate", "ui.bootstrap"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

app.controller('Ctrl', function($scope, $filter, $http) {
  
  $scope.tasks = [{
    id: 1,
    name: 'awesome user1',
    dynoSize: "Free",
    frequency: "Every 10 Minutes",
    lastRun: "Never",
    nextDue: "10:30",
  }];

  $scope.dynoSizes = [
  "Free"
  ];

  $scope.frequencies = [
    "Daily",
    "Hourly",
    "Every 10 Minutes"
  ];

  $scope.times = [
  "10:30",
  "11:30"
  ];

  $scope.tomorrow = new Date();
  $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);

  $scope.saveTask = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {
      id: id
    });
    return $http.post('/saveTask', data);
  };

  // remove user
  $scope.removeTask = function(index) {
    $scope.tasks.splice(index, 1);
  };

  // add user
  $scope.addTask = function() {
    $scope.inserted = {
      id: $scope.users.length + 1,
    };
    $scope.tasks.push($scope.inserted);
  };

});

// --------------- mock $http requests ----------------------
app.run(function($httpBackend) {

    $httpBackend.whenPOST(/\/saveTask/).respond(function(method, url, data) {
        data = angular.fromJson(data);
        return [200, {
            status: 'ok'
        }];
    });

});

