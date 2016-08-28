// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'starter.services', 'ion-affix','LocalStorageModule', 'btford.socket-io', 'angularMoment','firebase', 'ngCordova'])
/*.factory('Auth',function(){
    var config = {
    apiKey: "AIzaSyA8ZywNc84IYWPzPQR7hcXh5JuHAce7Eqo",
    authDomain: "mychat-91406.firebaseapp.com",
    databaseURL: "https://mychat-91406.firebaseio.com",
    storageBucket: "mychat-91406.appspot.com",
  };
  firebase.initializeApp(config);

  var test = {};

  test.createUser = function(email,password){
    firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(function(result){
            alert("created user!")
          })
          .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  test.signIn = function(email,password){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (result){
      alert(result.user.uid);
    })
    .catch(function(error) {
    // Handle Errors here.
    alert('shit')
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

  return test;

  }
})*/
// .constant('FirebaseUrl', 'https://mychat-91406.firebaseio.com/')
//   .service('rootRef', ['FirebaseUrl', firebase])
// .constant('FURL', 'https://mychat-91406.firebaseio.com/')

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {


  $ionicConfigProvider.backButton.icon('ion-android-arrow-back');
  $ionicConfigProvider.backButton.text('');
  $ionicConfigProvider.spinner.icon('dots');
  $ionicConfigProvider.navBar.alignTitle('left');

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        }
      }
    })

.state('app.signup', {
      url: '/signup',
      views: {
        'menuContent': {
          templateUrl: 'templates/signup.html',
          controller: 'SignUpCtrl'
        }
      }
    })


    .state('app.general', {
      url: '/general',
      views: {
        'menuContent': {
          templateUrl: 'templates/general.html',
          controller: 'GeneralController'
        }
      }
    }

      .state('app.psychView', {
        url:'/psychView',
        views: {
          'menuContent': {
            templateUrl: 'templates/psychView.html',
            controller: 'PsychCtrl'
          }
        }
      })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/general');
});
