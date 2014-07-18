angular.module('myApp.controllers').controller('ReservaController', ['$rootScope', '$scope', '$location', '$http', 'endpoint', function($rootScope, $scope, $location, $http, endpoint) {
	$http({method: 'GET', url: endpoint+'/Seguimiento/'+$.cookie("idTerminal")+'/reserva_shows/' + $rootScope.sesionId }).
    success(function(data, status, headers, config) {
      
    });

	$scope.name = $rootScope.nombre + " " + $rootScope.apellido;
	$scope.puntos = $rootScope.puntos;

	if($rootScope.nosocio == true){
		$scope.mensajefun = "Aún no es <strong>socio</strong>? Inscríbase gratis en los stands de atención al cliente.";
	}else{
		$scope.mensajefun = "Juegue con <strong>ventaja</strong>";
	}

	$rootScope.start();

	$scope.changeView = function(view){
		$rootScope.stop();
		$location.path(view); // path not hash
	}
}]);