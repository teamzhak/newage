var app = angular.module("app", ["firebase", "ionic"]);

app.controller("MyAuthCtrl", ["$scope", "$firebaseAuth",
    function($scope, $firebaseAuth) {
        var ref = new Firebase("https://newAgeMental.firebaseio.com");
        $scope.authObj = $firebaseAuth(ref);
    }
]);