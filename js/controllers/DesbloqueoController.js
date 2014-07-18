angular.module('myApp.controllers').controller('DesbloqueoController', ['$rootScope', '$scope', '$location', '$http', 'endpoint', function($rootScope, $scope, $location, $http, endpoint) {
	$http({method: 'GET', url: endpoint+'/Seguimiento/'+$.cookie("idTerminal")+'/desbloqueo_tarjeta/' + $rootScope.sesionId }).
    success(function(data, status, headers, config) {
      
    });

	$scope.name = $rootScope.nombre + " " + $rootScope.apellido;
	$scope.puntos = $rootScope.puntos;
	
	$rootScope.start();

	$scope.changeView = function(view){
		$rootScope.stop();
		$location.path(view); // path not hash
	}

	$http({method: 'GET', url: endpoint+'/DesbloqueoTarjeta/' + $rootScope.playerId }).
	    success(function(data, status, headers, config) {
	      $scope.mensaje = data.Mensaje;
	    }).
	    error(function(data, status, headers, config) {
	      $scope.mensaje = data.Mensaje;
	    });
	
}]);