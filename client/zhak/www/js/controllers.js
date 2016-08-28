angular.module('starter.controllers', ['firebase'])

.controller('AppCtrl', function($scope, $ionicSideMenuDelegate, $timeout,$state,$ionicHistory) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:


  $scope.$on('$ionicView.enter', function(e) {

  });

  $scope.preventFocus = function () {

    ionic.DomUtil.blurAll();

  }

  $scope.bot = function(){
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    $state.go("app.general");
  }

  $scope.goToLogin = function(){
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    $state.go("app.login");
  }

  $scope.signup = function(){
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    $state.go("app.signup");
  }

  $scope.psychView = function(){
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go("app.psychView");
  }

})

.controller('GeneralController', function($scope, $ionicScrollDelegate) {

  $scope.message = {
    text:''
  };

  $scope.messages = [
    {id: 1, user: 'Luis Bahamonde', avatar:'img/avatar1.gif', date:'10:43 AM', text:'hello world!' }
  ];

  $scope.ajustarScroll = function () {

    $ionicScrollDelegate.resize();
    $ionicScrollDelegate.scrollBottom(true);

  }

  $scope.sendMessage = function (message) {
    $scope.messages.push({user: 'Luis Bahamonde', avatar:'img/avatar1.gif', date:'10:43 AM', text:message.text});
    $scope.message.text = '';

    $ionicScrollDelegate.scrollBottom(true);
  }

})

.controller('LoginCtrl', function($scope, $state,localStorageService,$ionicHistory) {

//   // if(!firebase){
//   var config = {
//     apiKey: "AIzaSyA8ZywNc84IYWPzPQR7hcXh5JuHAce7Eqo",
//     authDomain: "mychat-91406.firebaseapp.com",
//     databaseURL: "https://mychat-91406.firebaseio.com",
//     storageBucket: "mychat-91406.appspot.com",
//   };
//   firebase.initializeApp(config);
// // }

  // var def = firebase.database().ref();


  $scope.signIn = function (name) {

    localStorageService.set('username', name);
        $ionicHistory.nextViewOptions({
    disableBack: true
    });
    $state.go('app.general');
    // Auth.signIn(email,password);


};

  $scope.goToSignUp = function(){
    $state.go('app.signup');
  }
})

.controller('SignUpCtrl', function($scope, $stateParams) {

  // // if(!firebase){
  // var config = {
  //   apiKey: "AIzaSyA8ZywNc84IYWPzPQR7hcXh5JuHAce7Eqo",
  //   authDomain: "mychat-91406.firebaseapp.com",
  //   databaseURL: "https://mychat-91406.firebaseio.com",
  //   storageBucket: "mychat-91406.appspot.com",
  // };
  // firebase.initializeApp(config);
  // // }

  // var def = firebase.database().ref();

  $scope.signUp = function(email,password){
        alert("hello");
        // Auth.createUser(email,password);


  }
})

.controller('PsychCtrl', function($scope){
  $scope.goToPatients = function(){
    $state.go('app.psychView');
})}
