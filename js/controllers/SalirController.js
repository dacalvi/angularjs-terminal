angular.module('myApp.controllers').controller('SalirController', ['$rootScope', '$scope', '$location', '$http', 'endpoint', function($rootScope, $scope, $location, $http, endpoint) {
	$http({method: 'GET', url: endpoint+'/CerrarSesion/' + $rootScope.sesionId }).
    success(function(data, status, headers, config) {
		$rootScope.sesionId = "";
		$rootScope.nombre = "";
		$rootScope.apellido = "";
		$rootScope.ranking = "";
		$rootScope.playerId = "";
		$location.path("home");
    }).
    error(function(data, status, headers, config) {
     		$rootScope.sesionId = "";
			$rootScope.nombre = "";
			$rootScope.apellido = "";
			$rootScope.ranking = "";
			$rootScope.playerId = "";
			$location.path("home");
    });


	
}]);