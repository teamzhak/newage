angular.module('starter.services', [])
// .factory("Chats",function($scope){})
.factory('Auth',function(rootRef,$firebaseAuth){
    alert("yes");
    return $firebaseAuth(rootRef);
});