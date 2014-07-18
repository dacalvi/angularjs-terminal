angular.module('myApp.controllers').controller('DondeEstoyController', ['$rootScope', '$scope', '$location', '$http', 'endpoint', function($rootScope, $scope, $location, $http, endpoint) {
	
	$http({method: 'GET', url: endpoint+'/Seguimiento/'+$.cookie("idTerminal")+'/donde_estoy/' + $rootScope.sesionId }).
    success(function(data, status, headers, config) {
      
    });

    $rootScope.start();

    if($rootScope.nosocio == true){
		$scope.mensajefun = "Aún no es <strong>socio</strong>? Inscríbase gratis en los stands de atención al cliente.";
		$scope.name = "";
		$scope.puntos = "";
	}else{
		$scope.mensajefun = "Juegue con <strong>ventaja</strong>";
		$scope.name = $rootScope.nombre + " " + $rootScope.apellido;
		$scope.puntos = $rootScope.puntos;
	}




	$scope.changeView = function(view){
		$rootScope.stop();
		$location.path(view); // path not hash
	}
	
	$scope.nromaquina = $.cookie("mapa");


}]);