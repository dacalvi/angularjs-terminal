angular.module('myApp.controllers').controller('PinCambiadoController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
	$scope.changeView = function(view){
	    $location.path(view); // path not hash
	}
}]);