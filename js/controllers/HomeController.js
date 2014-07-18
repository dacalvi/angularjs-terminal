angular.module('myApp.controllers').controller('HomeController', ['$rootScope', '$scope', '$location', function($rootScope ,$scope, $location) {
    
    $scope.changeView = function(view){
        $location.path(view); // path not hash
    }
    
}]);

