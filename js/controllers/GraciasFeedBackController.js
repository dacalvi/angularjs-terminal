angular.module('myApp.controllers').controller('GraciasFeedBackController', ['$rootScope', '$scope', '$location', '$http', function($rootScope, $scope, $location, $http) {
	
	if($rootScope.nosocio == true){
		$scope.name = "";
		$scope.puntos = "";
	}else{
		$scope.name = $rootScope.nombre + " " + $rootScope.apellido;
		$scope.puntos = $rootScope.puntos;
	}
    
	$scope.changeView = function(view){
	    $location.path(view); // path not hash
	}
}]);





















